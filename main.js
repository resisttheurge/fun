import { inspect } from 'util'

const data = [
  ['pencils', 'drawing', 'bob ross', 'the public'],
  ['pencils', 'drawing', 'tony danza', 'cooksys'],
  ['pencils', 'drawing', 'bob ross', 'drc'],
  ['brushes', 'painting', 'darth vader', 'wdng'],
  ['brushes', 'painting', 'tony danza', 'svm'],
  ['brushes', 'burnishing', 'tony danza', 'amex'],
  ['brushes', 'burnishing', 'bob ross', 'aa.com'],
  ['markers', 'grading', 'tony danza', 'fedex'],
  ['marquees', 'sliding', 'bob ross', 'cdc'],
  ['glitter', 'bedazzling', 'tony danza', 'ssi'],
  ['crayons', 'coloring', 'darth vader', 'imc'],
  ['crayons', 'coloring', 'bob ross', 'post office']
]

const input = {
  clientNames: ['i', 'svm'],
  adminNames: ['d'],
  resourceTypes: [],
  activityTypes: []
}

const resource =
  (type, activity) =>
    ({type, activity})

const activity =
  (type, admin) =>
    ({type, admin})

const admin =
  (name, client) =>
    ({name, client})

const client =
  (name) =>
    ({name})

const full =
  ([resourceType, activityType, adminName, clientName]) =>
    resource(resourceType,
      activity(activityType,
        admin(adminName,
          client(clientName))))

const resources =
  data.map(full)

const base =
  () => true

const clientName =
  (name) =>
    (resource) =>
      resource.activity.admin.client.name.match(name) !== null

const adminName =
  (name) =>
    (resource) =>
      resource.activity.admin.name.match(name) !== null

const resourceType =
  (name) =>
    (resource) =>
      resource.type.match(name) !== null

const activityType =
  (name) =>
    (resource) =>
      resource.activity.type.match(name) !== null

const or =
  (array) =>
    n =>
      array.some(f => f(n))

const and =
  (array) =>
    n =>
      array.every(f => f(n))

const fromCategory =
  searchFunction =>
    searchTerms =>
      searchTerms.length !== 0
        ? or(searchTerms.map(searchFunction))
        : base

const fromInput =
  (input) =>
    and([
      fromCategory(clientName)(input.clientNames),
      fromCategory(adminName)(input.adminNames),
      fromCategory(resourceType)(input.resourceTypes),
      fromCategory(activityType)(input.activityTypes)
    ])

const solution =
  resources
    .filter(fromInput(input))

const print =
  elem => console.log(inspect(elem, { depth: null }))

console.log('\n')
print('data: ')
console.log('')
print(data)

console.log('\n')
print('input: ')
console.log('')
print(input)

console.log('\n')
print('solution: ')
console.log('')
print(solution)
