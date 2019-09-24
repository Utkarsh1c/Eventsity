export class Discover {
    public ename : string;
    public category : string;
    public evenue : string;
    public fevenue : string;
    public imagePath : string;
    public date : string;
    public orgname : string;
    public description : string;

    constructor(ename:string, category:string, evenue:string, fevenue:string, 
                        imagePath:string, date:string, orgname:string, description : string) {
        this.ename = ename;
        this.category = category;
        this.evenue = evenue;
        this.fevenue = fevenue;
        this.imagePath = imagePath;
        this.date = date;
        this.orgname = orgname;
        this.description = description;
    }
}