/*export*/ class StoreCustomer {

    public visits:number = 0; //this is how declaration is done
    private ourName: string;

    constructor(private firstName: string,private lastName:string) { //by declaring private automatic creation of private field is done and available in class
        
    }


    //function
    public showName() {
        alert(this.firstName + " " + this.lastName);
    }

    //property must have setter and getter

    set name(val) {
        this.ourName = val;
    }

    get name() {
        return this.ourName;
    }
}