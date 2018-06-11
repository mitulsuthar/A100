export interface IProduct {
  id: number;
  title: string;
  price: number;
  imageUrl: string;
}

export class Product implements IProduct {
  id: number;
  title: string;
  price: number;
  imageUrl: string;

  constructor(_title:string,_price:number) {
    this.title = _title;
    this.price = _price;
  }
}
