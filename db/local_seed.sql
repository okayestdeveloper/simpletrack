insert into site
  (siteId, label, description, address)
values
  ('2a42be9c-9588-4587-bd44-7b4381b96c23', 'Thirsty Nomad', 'Headquarters', '4402 A Stuart Andrew Blvd, Charlotte, NC 28217'),
  ('fcaf620c-67f2-4805-8c5e-dc980b92d44c', 'Carolina Tabletop Games', '', '315 Main St #1, Pineville, NC 28134');

insert into location
  (siteId, locationId, label)
values
  ('2a42be9c-9588-4587-bd44-7b4381b96c23', 'e38a886b-3ae7-40f4-bdd2-c3e46c29bc33', 'Clean kegs'),
  ('2a42be9c-9588-4587-bd44-7b4381b96c23', 'f206c802-5a0c-4eb9-b9c2-a4ca93a2153e', 'Dirty kegs'),
  ('2a42be9c-9588-4587-bd44-7b4381b96c23', '22eb50e4-05c1-411f-96bb-a573d99dafd5', 'Inventory walkin'),
  ('2a42be9c-9588-4587-bd44-7b4381b96c23', 'b9bb8b55-fbfb-4778-a415-7a80414ec49e', 'Taproom walkin');

insert into assetStatus
  (assetStatusId, label)
values
  ('733c41ca-53e9-441f-ad2f-7ff4227598dc', 'active'),
  ('2048b16f-e101-4970-a61f-d815abbef445', 'repairing'),
  ('12680986-52a0-4bbf-8a64-cfaec9cb50ac', 'maintenance'),
  ('e3ae6849-bc6c-432e-92bd-00a9959263d2', 'decommisioned'),
  ('e0cab6da-9387-4c36-9d9a-1de56ac176ca', 'broken'),
  ('d396662b-2cd0-42c4-80a5-e9143a723539', 'destroyed');

insert into assetType
  (assetTypeId, label)
values
  ('66001018-8239-424e-8bdf-1f6bde813372', '1/6bbl keg'),
  ('11b27515-51bf-4512-84f9-00f2d38bbb04', '1/4bbl keg'),
  ('c81c335d-78d0-49cc-a8f3-0b7d9a59788d', '1/2bbl keg');

insert into asset
  (assetId, assetTypeId, assetStatusId, siteId, locationId, code)
values
  ('45fade20-b9c5-4b20-a8f5-801fd0654460', '66001018-8239-424e-8bdf-1f6bde813372', '733c41ca-53e9-441f-ad2f-7ff4227598dc', '2a42be9c-9588-4587-bd44-7b4381b96c23', 'e38a886b-3ae7-40f4-bdd2-c3e46c29bc33', '0001'), -- clean keg
  ('f22cf8d8-eb33-46f6-b995-07b3b36b849c', '66001018-8239-424e-8bdf-1f6bde813372', '733c41ca-53e9-441f-ad2f-7ff4227598dc', '2a42be9c-9588-4587-bd44-7b4381b96c23', 'f206c802-5a0c-4eb9-b9c2-a4ca93a2153e', '0002'), -- dirty keg
  ('0789ae76-4c98-45ba-9f7e-fd420feecfc7', '66001018-8239-424e-8bdf-1f6bde813372', '733c41ca-53e9-441f-ad2f-7ff4227598dc', '2a42be9c-9588-4587-bd44-7b4381b96c23', '22eb50e4-05c1-411f-96bb-a573d99dafd5', '0003'), -- inventory walkin
  ('493c088a-8eb9-44d7-a930-fcbb7a5c14f2', '66001018-8239-424e-8bdf-1f6bde813372', '733c41ca-53e9-441f-ad2f-7ff4227598dc', '2a42be9c-9588-4587-bd44-7b4381b96c23', 'b9bb8b55-fbfb-4778-a415-7a80414ec49e', '0004'), -- taproom  wi
  ('da4802b6-71a8-4168-8bb8-1839b92848ae', '66001018-8239-424e-8bdf-1f6bde813372', '733c41ca-53e9-441f-ad2f-7ff4227598dc', 'fcaf620c-67f2-4805-8c5e-dc980b92d44c', '', '0005'); -- customer

insert into assetMetaType
  (assetMetaTypeId, label)
values
  ('15cc6781-1797-4c00-8951-7fc426c757c4', 'Beer');

insert into assetMeta
  (assetMetaId, assetMetaTypeId, assetId, label)
values
  ('0bd8b8c9-e3b0-40ed-8d66-088f733c7fd4', '15cc6781-1797-4c00-8951-7fc426c757c4', '0789ae76-4c98-45ba-9f7e-fd420feecfc7', 'Companion'),
  ('d0b70978-1cec-46ef-b3fe-d3cbcfbd2d50', '15cc6781-1797-4c00-8951-7fc426c757c4', '493c088a-8eb9-44d7-a930-fcbb7a5c14f2', 'Companion');

