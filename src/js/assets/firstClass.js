class firstClass {
    static objectsCount = 0;
    constructor(){
        firstClass.objectsCount++;
        console.log(firstClass.objectsCount);
    }
}
for (let i = 0; i < 10; i++){
    new firstClass();
}