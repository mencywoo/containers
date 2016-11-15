from __future__ import print_function

import json
import urllib
import boto3

# profile='sstk-sandbox'
# region='us-east-1'
#
# # options, remainder = getopt.getopt(sys.argv[1:], '', [ 'action=', 'customer=','implementation=','environment=','project=', 'profile=', 'region=', 'tfver='])
# if profile is not None:
#     boto3.setup_default_session(profile_name=profile, region_name=region)

print('Loading function')

ec2 = boto3.client('ec2')
ssm = boto3.client('ssm')
elb = boto3.client('elb')

document_name = 'ssn_kubectl'
cluster_name = 'minik8s.mency.sandbox.shuttercloud.org'
action="up"


def lambda_handler(event, context):
    # find applicable instances
    applicable_instances=[]
    ClusterInstances=ec2.describe_instances(Filters=[{ 'Name':'tag-value', 'Values': [ cluster_name ]}, {'Name':'instance-state-code', 'Values': [ '16' ]  }, {'Name':'tag-key' , 'Values': [ 'k8s.io/role/master' ]}])['Reservations']
    for instanceItr in ClusterInstances:
      applicable_instances.append(instanceItr['Instances'][0]['InstanceId'])
    for i in applicable_instances:
      print("applicable_instance: " + i)

    # find name of the ELB
    msg=json.loads(event['Records'][0]['Sns']['Message'])
    for i in msg['Trigger']['Dimensions']:
        if i['name'] == 'LoadBalancerName':
            elb_name=urllib.unquote_plus(i['value'].encode('utf8'))
    print("elb_name:", elb_name)

    try:
        arg_str=action + ' ' + elb_name
        response = ssm.send_command(InstanceIds=applicable_instances, DocumentName=document_name, Parameters={ 'args': [ arg_str  ] })
        return str(response)
    except Exception as e:
        print(e)
        print('Error sending ssm doc {} to instances {}'.format( document_name, applicable_instances))
        raise e
