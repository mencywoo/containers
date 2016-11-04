from __future__ import print_function

import json
import urllib
import boto3

#profile='trinimbus_sn'
#region='us-west-2'

#options, remainder = getopt.getopt(sys.argv[1:], '', [ 'action=', 'customer=','implementation=','environment=','project=', 'profile=', 'region=', 'tfver='])
#if profile is not None:
#    boto3.setup_default_session(profile_name=profile, region_name=region)

print('Loading function')

s3 = boto3.client('s3')
ec2 = boto3.client('ec2')
ssm = boto3.client('ssm')

document_name = 'sync_s3_efs'
cluster_name = 'mencyminik8s.trinimbus.org'


def lambda_handler(event, context):

    # find all instances in the kubernetes cluster
    applicable_instances=[]
    ClusterInstances=ec2.describe_instances(Filters=[{ 'Name':'tag-value', 'Values': [ cluster_name ]}])['Reservations']
    for instanceItr in ClusterInstances:
      applicable_instances.append(instanceItr['Instances'][0]['InstanceId'])

    print("Received event: " + json.dumps(event, indent=2))

    for itr in event['Records']:
        # Get the object from the event and show its content type
        bucket = itr['s3']['bucket']['name']
        key = urllib.unquote_plus(itr['s3']['object']['key'].encode('utf8'))
        keymd5 = urllib.unquote_plus(itr['s3']['object']['eTag'].encode('utf8'))
        try:
            response = s3.get_object(Bucket=bucket, Key=key)
#            print("CONTENT TYPE: " + response['ContentType'])
#            return response['ContentType']
        except Exception as e:
            print(e)
            print('Error getting object {} from bucket {}. Make sure they exist and your bucket is in the same region as this function.'.format(key, bucket))
            raise e
        try:
            response = ssm.send_command(InstanceIds=applicable_instances, DocumentName=document_name, Parameters={ 'bucket': [ bucket ], 'key': [ key], 'keymd5': [keymd5] })
            return str(response)
        except Exception as e:
            print(e)
            print('Error sending ssm doc {} to instances {}'.format( document_name, applicable_instances))
            raise e
