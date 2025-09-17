export const policies = Array.from({ length: 20 }).map((_, i) => ({
  policyNo: `POL-${1000 + i}`,
  holderName: ['Alice','Bob','Charlie','Diana','Ethan','Fiona','George','Hannah','Ian','Julia'][i%10],
  type: ['Life','Health','Vehicle','Property','Travel'][i%5],
  premium: (200 + i * 15),
  startDate: new Date(Date.now() - i * 30 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10),
  status: ['Active','Pending','Expired','Cancelled'][i%4]
}))

export const claims = Array.from({ length: 15 }).map((_, i) => ({
  claimId: `CLM-${2000 + i}`,
  policyNo: `POL-${1000 + (i%20)}`,
  amount: (500 + i * 50),
  status: ['Open','Approved','Rejected'][i%3],
  date: new Date(Date.now() - i * 86400000).toISOString().slice(0,10),
  description: `Claim description for incident ${i + 1}`,
  documents: [`document_${i + 1}.pdf`, `receipt_${i + 1}.jpg`]
}))

export const customers = Array.from({ length: 10 }).map((_, i) => ({
  id: `CUS-${3000 + i}`,
  name: ['Alice','Bob','Charlie','Diana','Ethan','Fiona','George','Hannah','Ian','Julia'][i],
  email: `user${i}@mail.com`,
  phone: `+1-555-01${(10+i).toString()}`,
  address: `${100 + i} Main St, City, State 12345`,
  policies: [`POL-${1000 + i}`, `POL-${1010 - i}`].filter(Boolean),
  joinDate: new Date(Date.now() - i * 60 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10)
}))


