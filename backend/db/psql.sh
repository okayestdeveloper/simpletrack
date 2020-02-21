#!/usr/bin/env bash

PG_SEARCH_PATH=stdb

psql postgres://stdb_user:J3WGXkRANBelkHqxGK3XmX7Uuy3KsZZ@localhost/simpletrack?options=--search-path%3D$PG_SEARCH_PATH,public
