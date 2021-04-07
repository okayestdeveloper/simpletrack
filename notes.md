TODO: convert backend over to nestjs (https://docs.nestjs.com/first-steps)
TODO: Convert frontend to react typescript

# authentication thoughts

- Accounts are groups of users, kinda represents a company
- Users have a login
- Can users be in multiple accounts? Or would a person need to make separate users in each account? How do we handle super users?
- A user can be marked as an account owner.
  - The original account creator is an account owner
  - Only an account owner can make another account owner
  - Account owners can modify account details.
  - Probably going to do OpenID login via passport
- Users can have access to view sites
  - Default is all sites under an account
  - Maybe locations under sites
- We'll have a granular permission model.
  - add/edit or delete assets, including types
  - add/edit or delete sites, grants similar access to all locations in a site
  - Maybe more as we go along

# objects

## asset (keg)

- id (barcode value), string pk
- label, string
- assetTypeId, string
- locationId, string
- siteId, string
- assetStatusId, string

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
