export const rows = [
  {
    id: 1,
    reference_no: "REF001",
    supplier_name: "Supplier 1",
    created_at: "2023-07-01",
    updated_at: "2023-07-02",
    status: "Drafted",
    effective_date: "2023-07-10",
    assigned_user: "User 1",
  },
  {
    id: 2,
    reference_no: "REF002",
    supplier_name: "Supplier 2",
    created_at: "2023-07-03",
    updated_at: "2023-07-04",
    status: "Approved",
    effective_date: "2023-07-15",
    assigned_user: "User 2",
  },
  {
    id: 3,
    reference_no: "REF003",
    supplier_name: "Supplier 3",
    created_at: "2023-07-05",
    updated_at: "2023-07-06",
    status: "Pending",
    effective_date: "2023-07-12",
    assigned_user: "User 1",
  },
  {
    id: 4,
    reference_no: "REF004",
    supplier_name: "Supplier 4",
    created_at: "2023-07-07",
    updated_at: "2023-07-08",
    status: "Drafted",
    effective_date: "2023-07-18",
    assigned_user: "User 3",
  },
  {
    id: 5,
    reference_no: "REF005",
    supplier_name: "Supplier 5",
    created_at: "2023-07-09",
    updated_at: "2023-07-10",
    status: "Pending",
    effective_date: "2023-07-14",
    assigned_user: "User 2",
  },
];

export const rows2 = [
  {
    id: 1,
    item_code: "ITEM001",
    item_description: "Item 1 Description",
    dimensions: "10x10x10",
    price_per_pc: "10.00",
    base_unit: "Unit",
    target_unit: "Target Unit",
    currency: "USD",
    supplier_document_id: 1,
    created_at: "2023-07-01",
    updated_at: "2023-07-02",
  },
  {
    id: 2,
    item_code: "ITEM002",
    item_description: "Item 2 Description",
    dimensions: "20x20x20",
    price_per_pc: "20.00",
    base_unit: "Unit",
    target_unit: "Target Unit",
    currency: "USD",
    supplier_document_id: 2,
    created_at: "2023-07-03",
    updated_at: "2023-07-04",
  },
  {
    id: 3,
    item_code: "ITEM002",
    item_description: "Item 2 Description",
    dimensions: "20x20x20",
    price_per_pc: "20.00",
    base_unit: "Unit",
    target_unit: "Target Unit",
    currency: "USD",
    supplier_document_id: 2,
    created_at: "2023-07-03",
    updated_at: "2023-07-04",
  },
  {
    id: 4,
    item_code: "ITEM002",
    item_description: "Item 2 Description",
    dimensions: "20x20x20",
    price_per_pc: "20.00",
    base_unit: "Unit",
    target_unit: "Target Unit",
    currency: "USD",
    supplier_document_id: 2,
    created_at: "2023-07-03",
    updated_at: "2023-07-04",
  },
  {
    id: 5,
    item_code: "ITEM002",
    item_description: "Item 2 Description",
    dimensions: "20x20x20",
    price_per_pc: "20.00",
    base_unit: "Unit",
    target_unit: "Target Unit",
    currency: "USD",
    supplier_document_id: 2,
    created_at: "2023-07-03",
    updated_at: "2023-07-04",
  },
  {
    id: 6,
    item_code: "ITEM002",
    item_description: "Item 2 Description",
    dimensions: "20x20x20",
    price_per_pc: "20.00",
    base_unit: "Unit",
    target_unit: "Target Unit",
    currency: "USD",
    supplier_document_id: 2,
    created_at: "2023-07-03",
    updated_at: "2023-07-04",
  },

  {
    id: 7,
    item_code: "ITEM002",
    item_description: "Item 2 Description",
    dimensions: "20x20x20",
    price_per_pc: "20.00",
    base_unit: "Unit",
    target_unit: "Target Unit",
    currency: "USD",
    supplier_document_id: 2,
    created_at: "2023-07-03",
    updated_at: "2023-07-04",
  },

  {
    id: 8,
    item_code: "ITEM002",
    item_description: "Item 2 Description",
    dimensions: "20x20x20",
    price_per_pc: "20.00",
    base_unit: "Unit",
    target_unit: "Target Unit",
    currency: "USD",
    supplier_document_id: 2,
    created_at: "2023-07-03",
    updated_at: "2023-07-04",
  },

  {
    id: 9,
    item_code: "ITEM002",
    item_description: "Item 2 Description",
    dimensions: "20x20x20",
    price_per_pc: "20.00",
    base_unit: "Unit",
    target_unit: "Target Unit",
    currency: "USD",
    supplier_document_id: 2,
    created_at: "2023-07-03",
    updated_at: "2023-07-04",
  },
];

function createData(
  id,
  item_code,
  item_description,
  dimensions,
  price_per_pc,
  new_price,
  base_unit,
  target_unit,
  currency,
  created_at,
  updated_at
) {
  return {
    id,
    item_code,
    item_description,
    dimensions,
    price_per_pc,
    new_price,
    base_unit,
    target_unit,
    currency,
    created_at,
    updated_at,
    checked: false,
    history: [
      {
        name: "Contacto",
        country: "Germany",
        description: "11091700",
        offer: 300,
        currency: "USD($)"
      },
      {
        name: "Contacto",
        country: "Germany",
        description: "11091700",
        offer: 300,
        currency: "USD($)"
      },
      {
        name: "Contacto",
        country: "Germany",
        description: "11091700",
        offer: 300,
        currency: "USD($)"
      },
    ],
  };
}

export const rows3 = [
  createData(
    1,
    "ITEM001",
    "Item 1 Description",
    "10x10x5 cm",
    12.99,
    10.99,
    "pcs",
    "box",
    "USD",
    "2023-07-21",
    "2023-07-21"
  ),
  createData(
    2,
    "ITEM002",
    "Item 2 Description",
    "20x15x8 cm",
    19.99,
    16.99,
    "pcs",
    "pack",
    "USD",
    "2023-07-20",
    "2023-07-21"
  ),
  createData(
    3,
    "ITEM003",
    "Item 3 Description",
    "15x10x5 cm",
    9.99,
    8.49,
    "pcs",
    "pack",
    "USD",
    "2023-07-19",
    "2023-07-20"
  ),
];

  export const rows4 = [
    // { id: 1, so_ref: "8C03CE1E83C24D3B8ED6159CA0D8CE4D", status: "pending", so_created: "2023-07-27" },
    // { id: 2, so_ref: "6D38E6E5E56F4A6282CD152B6E24BACB", status: "confirmed", so_created: "2023-07-26" },
  ];
