#!/bin/bash

## sync_kubectl.sh

MAX_POD=10
MIN_POD=1

usage() {

  echo -e "$0 <action> <elb_name>"
  echo -e "$0 up a702f34eaa6b011e68fa90a0de1aa697"


}

find_deployment() {
  local elb_name="${1:-}"
  echo $(kubectl get services -o wide | grep $elb_name | awk '{print $1}')
}


scale_deployment() {

  local a_deploy="${1:-}"
  local a_action="${2:-}"
  local a_step="${3:-1}"

  # find current number of deployments
  local curr_desired=$(kubectl get deployment ${a_deploy} --no-headers=true | awk '{print $2}')
  logger -s "Current desired number of replicas: $curr_desired"
  local new_desired=
  if [[ "${a_action}" == "up" ]]; then
    if [ "$curr_desired" -lt "$MAX_POD" ]; then
      new_desired=$(($curr_desired+$a_step))
    else
      new_desired=$curr_desired
    fi
  else
    if [ "$curr_desired" -gt "$MIN_POD" ]; then
      new_desired=$(($curr_desired-$a_step))
    else
      new_desired=$curr_desired
    fi
  fi
  logger -s "New desired number of replicas: $new_desired"
  if [[ ! -z "${new_desired}" ]]; then
    kubectl scale deployment ${a_deploy} --replicas=${new_desired}
  else
    logger -s -p error  "New number of replicas cannot be determined. No scaling"
    exit 1
  fi
}

cmd=""

for i in "${@}"; do
  cmd="${cmd} $i"
done
logger "Command issued: $cmd"



# scale up: up a702f34eaa6b011e68fa90a0de1aa697
if [[ "up" == "$1" ]]; then
  elb_name="$2"
  deployment_name=$(find_deployment "$elb_name")
  scale_deployment "$deployment_name" "up"
elif [[ "down" == "$1" ]]; then
  elb_name="$2"
  deployment_name=$(find_deployment "$elb_name")
  scale_deployment "$deployment_name" "down"
fi
