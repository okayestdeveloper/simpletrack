#!/usr/bin/env bash
set -euo pipefail

SEED_FILE=''
ENTIRE_DATABASE=''

while getopts ":f:dh" opt; do
  case $opt in
    f)
      SEED_FILE="$OPTARG"
      ;;
    h)
      echo "load.sh [-f /path/to/seed/file] [-d]" >&2
      echo "WARNING: this drops and recreates the database!" >&2
      exit
      ;;
    :)
      echo "Missing argument for -$OPTARG" >&2
      exit
      ;;
    \?)
      echo "Invalid option: -$OPTARG" >&2
      exit
      ;;
  esac
done

if [[ -z "$SEED_FILE" ]]; then
   SEED_FILE=./local_seed.sql
fi

echo "DROP DATABASE simpletrack" | psql postgres
echo "create database simpletrack with owner stdb_user" | psql postgres
echo 'create extension if not exists "uuid-ossp"' | psql simpletrack
pg_restore -j 4 -e -c --if-exists -h localhost -p 5432 -d simpletrack -U stdb_user -O $SEED_FILE
