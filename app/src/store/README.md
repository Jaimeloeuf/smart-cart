# store/
- All pinia store related logic is stored in this folder.
- All store modules uses the `.store.ts` extension.


## Stores
- [item](./item.store.ts)
    - Stores all items data, and logic to refresh the data and other misc tasks.
- [cart](./cart.store.ts)
    - Stores all cart item data, and logic to refresh the data and other misc tasks.
- [group](./group.store.ts)
    - Stores all user's group data, and logic to refresh the data and other misc tasks.
- [misc-data](./misc-data.store)
    - Stores all misc data in one place.
- [notif](./notif.store)
    - Stores logic to manage local in app notification UI.