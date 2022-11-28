import fs from 'fs';

interface Product {
  id: string;
  name: string;
  unit_price: number;
  quantity: number;
  created_date: Date; // can be number (unix time) if you want to
}


const addProduct = (add: Product) => {
  const file = fs.readFileSync('./data.json').toString();
  const data = file === "" ? [] : JSON.parse(file);

  if(data.length === 0 ) {
      data.push(add)

      fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
          if(err) {
              console.log("ERROR") 
          }
          console.log("SUCCESSFULLY ADD THE PRODUCT")

      })

        }else{
      const checker = data.find((item : Product) => {
          return item.id === add.id
      })

      if(checker) {
          return console.log("ERROR")
      }else{
          data.push(add)
          fs.writeFile('./data.json', JSON.stringify(data, null, 2), (err) => {
              if(err) {
                console.log("ERROR")
              }
              console.log("SUCCESSFULLY ADDED THE PRODUCT")

          })
        }
      }
    }

  const showProduct = () => {
    const file = fs.readFileSync('./data.json').toString();
    const data = file === "" ? [] : JSON.parse(file);

    if(data.length === 0){
      console.log("Data is Empty")

    }else{
      console.log("***LIST OF PRODUCTS***")
      const prod_list = data.sort((a : Product | any, b : Product | any) : any  => {
        a.created_date = new Date(a.created_date);
        b.created_date = new Date(b.created_date);
    
        return b.created_date - a.created_date;
      });
      prod_list.map((prod : Product) => {
        prod.quantity >= 1 ?
        console.log({
          name : prod.name,
          unit_price : prod.unit_price,
          total_price : prod.unit_price*prod.quantity
        })
        : ""
      })
    }
  }

  const updateData= (id:string,unit_price:number,quantity:number )=>{
    let p = fs.readFileSync('./data.json')
    let update = JSON.parse(p.toString())
    if(update.length === 0){
      console.log("There is no existing Product!")
      return;     
    }
    else{
      const checker = update.find((item : Product) => {
        if(item.id === id){
          return item.id
        }
      })
      if(checker===undefined){
        return console.log("There is no existing Product!")    
      }
      else{
        let f = update.map((item:any) => {
          if(item.id === id){
            item.unit_price = unit_price
            item.quantity= quantity
            console.log("SUCCESSFULLY UPDATED THE PRODUCT")
            console.log("***LIST OF PRODUCTS***")
            console.log(update)
          }
          return item
        })  
        fs.writeFile('./data.json', JSON.stringify(f), ()=> {
        });
      }
    }
  }

  const deleteData=(id:string)=>{
    const file = JSON.parse(fs.readFileSync('./data.json').toString());
     const res=file.filter((product:Product)=>product.id!=id)
    
     fs.writeFile('./data.json', JSON.stringify(res, null, 2), (err) => {
      if(err) {
        console.log("ERROR")
      }
      console.log("SUCCESSFULLY DELETED THE PRODUCT")
      console.log("***LIST OF PRODUCTS***")
      console.log(res)

  })

  }
  

  // addProduct({
  //   id: "1",
  //   name: "Buko Juice",
  //   unit_price: 10,
  //   quantity: 4,
  //   created_date: new Date()
  // })
  
  // addProduct({
  //   id: "2",
  //   name: "Coke",
  //   unit_price: 90,
  //   quantity: 5,
  //   created_date: new Date()
  // })

  //  addProduct({
  //   id: "4",
  //   name: "Lemon Juice",
  //   unit_price: 10,
  //   quantity: 10,
  //   created_date: new Date()
  // })


// showProduct()

updateData("4",10, 6)

// deleteData("2")