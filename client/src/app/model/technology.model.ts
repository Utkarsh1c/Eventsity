export class Technology {
    public ename : string;
    public evenue : string;
    public fevenue : string;
    public imagePath : string;
    public date : string;
    public orgname : string;

    constructor(ename:string, evenue:string, fevenue:string, imagePath:string, date:string, orgname:string) {
        this.ename = ename;
        this.evenue = evenue;
        this.fevenue = fevenue;
        this.imagePath = imagePath;
        this.date = date;
        this.orgname = orgname;
    }
}