#!/bin/bash

## sync_s3_efs.sh

## example  ./sync_s3_efs.sh trinimbus-sandbox-mency-us-west-2  config/simple-node/static/test2.jpg 92c31a68a93b1f0f755a5493b7895d77


bucket="${1:-}"
key="${2:-}"
key_md5="${3:-}"
efs_sync_root="${4:-/opt/efs}"

if [[ -z "${bucket}" ]] || [[ -z "${key}" ]]; then
  logger -s "$0: not all parameters defined. Abort. "
  logger -s "$0: bucket='$bucket', key='$key' "
  exit 1
fi

[ -f ${efs_sync_root} ] && rm -fr ${efs_sync_root}
target_folder="${efs_sync_root}/$(dirname $key)"

logger -s "$0: updated file: 's3://${bucket}/${key}'"
logger -s "$0: key_md5='${key_md5}'"

## get md5 of file if exists.
## if md5 already the same,  don't bother copying

logger -s "$0: checking for potential target file ${target_folder}/$(basename $key)"

if [ -f ${target_folder}/$(basename $key)  ]; then
  curr_md5=$(md5sum ${target_folder}/$(basename $key) | awk '{print $1}')
  if [[ "${curr_md5}" == "${key_md5}" ]]; then
    logger -s "$0: file ${target_folder}/$(basename $key) already up to date. Nothing to do."
    exit 0
  fi
fi

mkdir -p ${target_folder}

logger -s aws s3 cp s3://${bucket}/${key} ${target_folder}

aws s3 cp s3://${bucket}/${key} ${target_folder}
