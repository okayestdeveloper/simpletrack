TODO: convert backend over to nestjs (https://docs.nestjs.com/first-steps)
TODO: Convert frontend to react typescript

# objects

## asset (keg)

- id (barcode value), string pk
- label, string
- type id, string
- location id, string
- site id, string

## asset status (active, repairing, decommissioned...)

- id, string
- label, string

## asset type (1/2, 1/6, 1/4, corny)

- id, string
- label, string

## site (TNB, Customer 1, Customer 2...)

- id, string
- label, string
- description, string
- address, string

## location (Walkin, Clean Stack, Dirty Stack...)

- id, string
- label, string
- description, string
- siteId, string

## users

- id, string
- userlabel, string
- email, string
- password, bcrypt string

# actions

- CRUD all objects
- Move asset from one site-location pair to another
- add multiple assets at once (with same basic values)
- replicate an asset
- decommission an asset

# routes

GET /site
GET /site/:id
POST /site
PUT /site/:id
DELETE /site/:id

GET /location
GET /location/:id
POST /location
PUT /location/:id
DELETE /location/:id

GET /assetType
GET /assetType/:id
POST /assetType
PUT /assetType/:id
DELETE /assetType/:id

GET /assetMetaType
GET /assetMetaType/:id
POST /assetMetaType
PUT /assetMetaType/:id
DELETE /assetMetaType/:id

GET /assetMeta
GET /assetMeta/:id
POST /assetMeta
PUT /assetMeta/:id
DELETE /assetMeta/:id

GET /assetStatus
GET /assetStatus/:id
POST /assetStatus
PUT /assetStatus/:id
DELETE /assetStatus/:id

GET /asset
GET /asset/:id
GET /asset/code/:code
POST /asset/search
body: {
fieldname: search value
}
POST /asset
body: asset
POST /assets
body: asset[]
POST /asset/replicate
body: {
assetId - the one to replicate
num - how many times to replicate
startingCode - the code number to start with
}
PUT /asset/:id
body: asset
DELETE /asset/:id

# notes

- Barcode type is Code 39
