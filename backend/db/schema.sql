-- PGOPTIONS=--search_path=stdb psql -d simpletrack -U stdb_user -f schema.sql

create or replace function nonempty(text) returns boolean as $$
  select length(trim($1)) > 0
$$ language sql strict immutable;

-- remove tables in reverse order
drop table if exists asset_meta;
drop table if exists asset_meta_type;
drop table if exists asset;
drop table if exists asset_status;
drop table if exists asset_type;
drop table if exists location;
drop table if exists site;
drop table if exists st_user;

-- For authentication
create table st_user (
  user_id text primary key,
  username text not null,
  email text,
  password text not null,

  check (nonempty(username)),
  check (nonempty(email)),

  /* metadata */
  created_by        text,
  modified_by       text,
  created_datetime  timestamp default now(),
  modified_datetime timestamp default now()
);


-- A site is a geographic location. Like Thirsty Nomad Brewing, or Brewery
create table site (
  site_id text primary key,
  label text not null unique,
  description text,
  address text,

  check (nonempty(label)),

  /* metadata */
  created_by        text,
  modified_by       text,
  created_datetime  timestamp default now(),
  modified_datetime timestamp default now()
);
create index site_label_idx on site (label);


-- Location is a more specific part of a site. Like Inventory Walkin
create table location (
  location_id text primary key,
  label text not null,
  site_id text not null,
  description text,

  foreign key (site_id) references site (site_id),

  unique (site_id, label),
  check (nonempty(label)),

  /* metadata */
  created_by        text,
  modified_by       text,
  created_datetime  timestamp default now(),
  modified_datetime timestamp default now()
);
create index location_label_idx on location (label);


-- Used for categorizing assets. E.g. 1/6bbl keg, 1/2bbl keg, laptop
create table asset_type (
asset_type_id text primary key,
  label text not null unique,

  check (nonempty(label)),

  /* metadata */
  created_by        text,
  modified_by       text,
  created_datetime  timestamp default now(),
  modified_datetime timestamp default now()
);
create index asset_type_label_idx on asset_type (label);


-- for managing asset state. E.g. 'in service', 'broken', 'maintenance/repair', ...
create table asset_status (
  asset_status_id text primary key,
  label text not null unique,

  check (nonempty(label)),

  /* metadata */
  created_by        text,
  modified_by       text,
  created_datetime  timestamp default now(),
  modified_datetime timestamp default now()
);
-- create index asset_statusLabel_idx on asset_status (label); -- probably don't need this

-- Represents a specific asset
create table asset (
  asset_id text primary key,
  label text, -- amounts to a UI overr_ide for asset_type.label in lists
  code text not null unique,
  asset_type_id text not null,
  asset_status_id text not null,
  location_id text,
  site_id text not null, -- I could get location from site, but location isn't required (as in customers)

  check (nonempty(code)),

  foreign key (asset_type_id) references asset_type (asset_type_id),
  foreign key (asset_status_id) references asset_status (asset_status_id),
  foreign key (location_id) references location (location_id),
  foreign key (site_id) references site (site_id),

  /* metadata */
  created_by        text,
  modified_by       text,
  created_datetime  timestamp default now(),
  modified_datetime timestamp default now()
);
create index asset_code_idx on asset (code);


-- A class of asset meta data. E.g. "Beer"
create table asset_meta_type (
  asset_meta_type_id text primary key,
  label text not null,

  check(nonempty(label)),

  /* metadata */
  created_by        text,
  modified_by       text,
  created_datetime  timestamp default now(),
  modified_datetime timestamp default now()
);
create index asset_meta_type_label_idx on asset_meta_type (label);


-- Extra data about an asset instance. E.g. "Sweeney"
create table asset_meta (
  asset_meta_id text primary key,
  asset_id text not null, -- fk
  asset_meta_type_id text not null, -- fk
  label text not null,

  check(nonempty(label)),

  /* metadata */
  created_by        text,
  modified_by       text,
  created_datetime  timestamp default now(),
  modified_datetime timestamp default now()
);
create index asset_meta_asset_idx on asset_meta (asset_id);
create index asset_meta_type_idx on asset_meta (asset_meta_type_id);
create index asset_meta_label_idx on asset_meta (label);
