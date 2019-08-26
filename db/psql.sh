#!/usr/bin/env bash

PG_SEARCH_PATH=main

# while getopts ":t:h" opt; do
#   case $opt in
#     h)
#       echo "run.sh [-t tenant]" >&2
#       echo "        -t TENANT: tenant name, without prefix, default mskcc" >&2
#       exit
#       ;;
#     :)
#       echo "Missing argument for -$OPTARG" >&2
#       exit
#       ;;
#     \?)
#       echo "Invalid option: -$OPTARG" >&2
#       exit
#       ;;
#   esac
# done

psql postgres://stdb_user:J3WGXkRANBelkHqxGK3XmX7Uuy3KsZZ@localhost/simpletrack?options=--search-path%3D$PG_SEARCH_PATH,public
