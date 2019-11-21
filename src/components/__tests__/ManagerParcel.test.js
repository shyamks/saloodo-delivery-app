const { ManagerParcel } = require('../ManagerParcel')
const ShallowRenderer = require('react-test-renderer/shallow')
const React = require('react')

const PICKUP_TIME = new Date('January 28, 2019 03:24:00');
const DELIVERY_TIME = new Date('January 29, 2019 09:24:00');

test('Manager checking parcel in WAITING status', () => {
  let id = 1
  let parcelData = {
    id,
    name: `Package #${id}`,
    status: 'WAITING',
    deliveryTime: null,
    pickupTime: null,
    assignedBiker: null
  }
  const renderer = new ShallowRenderer()
  renderer.render(<ManagerParcel parcelData={parcelData} id={id} />)
  const tree = renderer.getRenderOutput()
  expect(tree).toMatchSnapshot()
});

test('Manager checking parcel in ASSIGNED status', () => {
  let id = 1
  let parcelData = {
    id,
    name: `Package #${id}`,
    status: 'ASSIGNED',
    deliveryTime: null,
    pickupTime: null,
    assignedBiker: 'Biker1'
  }
  const renderer = new ShallowRenderer()
  renderer.render(<ManagerParcel parcelData={parcelData} id={id} />)
  const tree = renderer.getRenderOutput()
  expect(tree).toMatchSnapshot()
});

test('Manager checking parcel in PICKED_UP status', () => {
  let id = 1
  let parcelData = {
    id,
    name: `Package #${id}`,
    status: 'PICKED_UP',
    deliveryTime: null,
    pickupTime: PICKUP_TIME,
    assignedBiker: 'Biker1'
  }
  const renderer = new ShallowRenderer()
  renderer.render(<ManagerParcel parcelData={parcelData} id={id} />)
  const tree = renderer.getRenderOutput()
  expect(tree).toMatchSnapshot()
});

test('Manager checking parcel in DELIVERED status', () => {
  let id = 1
  let parcelData = {
    id,
    name: `Package #${id}`,
    status: 'DELIVERED',
    deliveryTime: DELIVERY_TIME,
    pickupTime: PICKUP_TIME,
    assignedBiker: 'Biker1'
  }
  const renderer = new ShallowRenderer()
  renderer.render(<ManagerParcel parcelData={parcelData} id={id} />)
  const tree = renderer.getRenderOutput()
  expect(tree).toMatchSnapshot()
});