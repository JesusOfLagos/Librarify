
class CustomNode {
    public readonly value: number;
    public next: CustomNode | null = null;

    constructor(value: number) {
        this.value = value;
    }
}

class LinkedList {
    private head: CustomNode | null = null;
    private size: number = 0;

    add(value: number): void {
        const newNode = new CustomNode(value);


        if(this.head === null) {
            this.head = newNode;
            return;
        }

        let currentNode = this.head;
        while(currentNode.next != null){
            currentNode = currentNode.next
        }

        currentNode.next = newNode
    }


    addNewHead(value: number): void {
        const newNode = new CustomNode(value);

        newNode.next = this.head
        this.head = newNode
    }



    traverse() {
        if(!this.head) {
            return;
        } else {
            let currentNode = this.head;
            while(currentNode) {
                console.log(currentNode.value)
                currentNode = currentNode.next;
            }
        }
    }

    addNodeAtPosition(value: number, position: number): void {
        if (position < 0) {
            throw new Error("Invalid Position Given!")
        } else {

            const newnode = new CustomNode(value)
            let counter : number = 0
            let previousNode = this.head;
            let currentNode = this.head?.next;

            while(currentNode) {
                if (counter === position-1) {
                    newnode.next = currentNode;
                    previousNode!.next = newnode
                    break;
                }

            }


            previousNode = currentNode;
            currentNode = currentNode.next

            counter++
        }
}

}



function main() {
    const list = new LinkedList();
    const emptyList = new LinkedList

    list.add(10);
    list.add(20);
    list.add(30);
    list.add(40);
    list.addNewHead(70)
    list.addNodeAtPosition(100, 2)
    list.addNodeAtPosition(56,12)
    list.traverse()
    emptyList.traverse()


    console.log(list)
}


main()
