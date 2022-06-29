import { CartItem } from "../contexts/Interface";

class CartApi {
  total: number = 0;
  items: Array<CartItem> = [];
  numberOfItems: number = 0;
  // currencyWatch = {
  //   symbolInternal: "$",
  //   aListener: function (val: string) {},
  //   set symbol(val: string) {
  //     this.symbolInternal = val;
  //     this.aListener(val);
  //   },
  //   get symbol() {
  //     return this.symbolInternal;
  //   },
  //   registerListener: function (listener: (val: string) => void) {
  //     this.aListener = listener;
  //   },
  // };
  currency: string = "$";
  // constructor() {
  //   // this.currencyWatch.registerListener((val) => {
  //   //   // this.updateCart();
  //   // });
  //   console.log("total", this.total);
  //   // this.total = 0;
  //   // this.items = [];
  //   // this.numberOfItems = 0;
  //   // this.currency = "$";
  // }
  addItem = async (item: CartItem) => {
    const itemInCart = this.isItemInCart(item);
    // console.log("Item Cart", itemInCart, "Item", item);
    if (itemInCart !== -1) {
      this.items[itemInCart] = {
        ...this.items[itemInCart],
        quantity: this.items[itemInCart].quantity + 1,
      };
    } else {
      this.items.push(item);
    }
    // }
    // console.log("Items Before Update", this.items);
    // this.updateCart();
    // this.items.push(item);
    // console.log("Items", this.items);
    await this.updateCart();
  };

  removeItem = async (item: CartItem) => {
    const itemInCart = this.isItemInCart(item);
    if (itemInCart !== -1) {
      if (this.items[itemInCart].quantity === 1) {
        this.items.splice(itemInCart, 1);
      } else {
        this.items[itemInCart].quantity -= 1;
      }
    } else {
    }
    this.updateCart();
  };
  changeAttribute = async (
    item: CartItem,
    attributeList: Array<{ attribute: string; value: string }>
  ) => {
    const itemInCart = this.findIndexOfUUID(item.uuid);
    if (itemInCart !== -1) {
      this.items[itemInCart] = {
        ...this.items[itemInCart],
        selectedAttribute: attributeList,
      };
    } else {
      console.log("Nothing");
    }
    await this.updateCart();
  };
  changeDefaultCurrency = async (symbol: string) => {
    this.currency = symbol;
    await this.updateCart();
  };
  persist = async () => {
    if (typeof window !== "undefined") {
      // console.log("Persit", this.total);
      if (typeof this.total !== "undefined") {
        window.sessionStorage.setItem(
          "_scandi",
          JSON.stringify({
            total: this.total,
            numberOfItems: this.numberOfItems,
            items: this.items,
            currency: this.currency,
          })
        );
      }
    } else {
      console.log("Error check Mount");
    }
  };
  restore = async () => {
    if (typeof window !== "undefined") {
      const _store = window.sessionStorage.getItem("_scandi");
      // console.log("Stored", _store);
      try {
        if (_store === "" || _store === null) {
        } else {
          // console.log("Stored", _store);
          const _storeJSON = JSON.parse(_store);
          // console.log("Stored", _store);
          // console.log("Stored", _storeJSON);
          this.total = Number(_storeJSON.total);
          this.currency = _storeJSON.currency;
          this.items = _storeJSON.items;
          this.numberOfItems = Number(_storeJSON.numberOfItems);
        }
      } catch (e) {
        console.log(e);
      }
    }
  };
  updateCart = async () => {
    // console.log("Update-Cart", this.items);
    this.items.forEach((element, index: number) => {
      let similarAttributes = this.isSimilarItemInCart(element);
      if (similarAttributes.length > 1) {
        const lastItem = similarAttributes.at(-1);
        if (lastItem) {
          const totalQuantity = similarAttributes.map(
            (element) => element.quantity
          );
          const total = totalQuantity.reduce(
            (previous, current) => previous + current
          );
          similarAttributes = similarAttributes.filter(
            (_e) => _e.uuid !== lastItem.uuid
          );
          // console.log("SA", similarAttributes);
          // console.log("Update-Cart Check Total", total, totalQuantity);
          const indexOfLastItem = this.findIndexOfUUID(lastItem.uuid);
          if (indexOfLastItem) {
            // console.log("Update-Cart Check", total, totalQuantity);
            this.items[indexOfLastItem] = {
              ...this.items[indexOfLastItem],
              quantity: total,
            };
          }
          similarAttributes.forEach((similarity) => {
            this.items = this.items.filter(
              (_item) => _item.uuid !== similarity.uuid
            );
          });
          // console.log(
          //   "Update-Cart Check AFter",
          //   this.items
          //   // selectedIndexes.includes(_stringFyIndex)
          // );
        }
      } else {
        // console.log("Nothing");
      }
    });

    const total: Array<number> = [];
    const number: Array<number> = [];
    this.items.forEach((element) => {
      let priceObject = element.prices.find((price) => {
        //@ts-ignore
        let symbol = price.currency.symbol;
        return symbol === this.currency;
      });
      if (priceObject) {
        total.push(
          Number(
            parseFloat(
              String(Number(priceObject.amount) * element.quantity)
            ).toFixed(2)
          )
        );
      } else {
        total.push(Number(0.0));
      }
    });
    this.total = total.reduce((previous, current) => previous + current);
    this.items.forEach((item) => {
      number.push(Number(item.quantity));
    });
    this.numberOfItems = number.reduce(
      (previous, current) => previous + current
    );
    this.persist();
  };

  isItemInCart = (item: CartItem) => {
    return this.items.findIndex((_item, index: number) => {
      if (_item.id === item.id) {
        const isAttributesSame =
          item.selectedAttribute.length === _item.selectedAttribute.length;
        let includesElements = item.selectedAttribute.every((element) => {
          if (
            _item.selectedAttribute.find(
              (_attr) =>
                _attr.attribute === element.attribute &&
                _attr.value === element.value
            )
          ) {
            return true;
          } else {
            return false;
          }
        });
        console.log("Isimilar", isAttributesSame, includesElements);
        if (isAttributesSame && includesElements) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
  };
  findIndexOfUUID = (uuid: string) => {
    return this.items.findIndex((element) => element.uuid === uuid);
  };
  findItemByUUID = (uuid: string) => {
    return this.items.find((element) => element.uuid === uuid);
  };
  isSimilarItemInCart = (item: CartItem) => {
    return this.items.filter((_item) => {
      if (_item.id === item.id) {
        const isAttributesSame =
          item.selectedAttribute.length === _item.selectedAttribute.length;
        let includesElements = item.selectedAttribute.every((element) => {
          if (
            _item.selectedAttribute.find(
              (_attr) =>
                _attr.attribute === element.attribute &&
                _attr.value === element.value
            )
          ) {
            return true;
          } else {
            return false;
          }
        });
        if (isAttributesSame && includesElements) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    });
  };
}
export default CartApi;
