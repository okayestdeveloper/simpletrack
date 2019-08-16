create or replace function nonempty(text) returns boolean as $$
  select length(trim($1)) > 0
$$ language sql strict immutable;

-- For authentication
create table user (
  userId text primary key,
  username text not null,
  email text,
  password text not null,

  check (nonempty(username)),
  check (nonempty(email)),

  /* metadata */
  createdBy        text,
  modifiedBy       text,
  createdDatetime  timestamp default now(),
  modifiedDatetime timestamp default now()
);


-- A site is a geographic location. Like Thirsty Nomad Brewing, or Brewery
create table site (
  siteId text primary key,
  label text not null unique,
  description text,
  address text,

  check (nonempty(label)),

  /* metadata */
  createdBy        text,
  modifiedBy       text,
  createdDatetime  timestamp default now(),
  modifiedDatetime timestamp default now()
);
create index siteLabelIdx on site (label);


-- Location is a more specific part of a site. Like Inventory Walkin
create table location (
  locationId text primary key,
  label text not null,
  siteId text not null,
  description text,

  foreign key (siteId) references site (siteId),

  unique (siteId, label),
  check (nonempty(label)),

  /* metadata */
  createdBy        text,
  modifiedBy       text,
  createdDatetime  timestamp default now(),
  modifiedDatetime timestamp default now()
);
create index locationLabelIdx on location (label);


-- Used for categorizing assets. E.g. 1/6bbl keg, 1/2bbl keg, laptop
create table assetType (
  assetTypeId text primary key,
  label text not null unique,

  check (nonempty(label)),

  /* metadata */
  createdBy        text,
  modifiedBy       text,
  createdDatetime  timestamp default now(),
  modifiedDatetime timestamp default now()
);
create index assetTypeLabelIdx on assetType (label);


-- for managing asset state. E.g. 'in service', 'broken', 'maintenance/repair', ...
create table assetStatus (
  assetStatusId text primary key,
  label text not null unique,

  check (nonempty(label)),

  /* metadata */
  createdBy        text,
  modifiedBy       text,
  createdDatetime  timestamp default now(),
  modifiedDatetime timestamp default now()
);
-- create index assetStatusLabelIdx on assetStatus (label); -- probably don't need this

-- Represents a specific asset
create table asset (
  assetId text primary key,
  label text, -- amounts to a UI override for assetType.label in lists
  code text not null unique,
  assetTypeId text not null,
  assetStatusId text not null,
  locationId text not null,
  siteId text not null, -- I could get location from site, but location isn't required (as in customers)

  check (nonempty(code)),

  foreign key (assetTypeId) references assetType (assetTypeId),
  foreign key (assetStatusId) references assetStatus (assetStatusId),
  foreign key (locationId) references location (locationId),
  foreign key (siteId) references site (siteId),

  /* metadata */
  createdBy        text,
  modifiedBy       text,
  createdDatetime  timestamp default now(),
  modifiedDatetime timestamp default now()
);
create index assetCodeIdx on asset (code);


-- A class of asset meta data. E.g. "Beer"
create table assetMetaType (
  assetMetaTypeId text primary key,
  label text not null,

  check(nonempty(label))

  /* metadata */
  createdBy        text,
  modifiedBy       text,
  createdDatetime  timestamp default now(),
  modifiedDatetime timestamp default now()
);
create index assetMetaTypeLabelIdx on assetMetaType (label);


-- Extra data about an asset instance. E.g. "Sweeney"
create table assetMeta (
  assetMetaId text primary key,
  assetId text not null, -- fk
  assetMetaTypeId text not null, -- fk
  label text not null,

  check(nonempty(label))

  /* metadata */
  createdBy        text,
  modifiedBy       text,
  createdDatetime  timestamp default now(),
  modifiedDatetime timestamp default now()
);
create index assetMetaAssetIdx on assetMeta (assetId);
create index assetMetaTypeIdx on assetMeta (assetMetaTypeId);
create index assetMetaLabelIdx on assetMeta (label);
