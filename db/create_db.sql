select pg_terminate_backend(pid)
  from pg_stat_activity
 where datname = 'simpletrack';

DROP DATABASE IF EXISTS simpletrack ;

-- DROP USER IF EXISTS stdb_user;


/* Regular user create */
CREATE USER stdb_user
  WITH LOGIN
       ENCRYPTED PASSWORD 'J3WGXkRANBelkHqxGK3XmX7Uuy3KsZZ';

CREATE DATABASE simpletrack WITH OWNER = stdb_user;

\c simpletrack;
/* UUID support */

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

SET role stdb_user;

CREATE SCHEMA main;
