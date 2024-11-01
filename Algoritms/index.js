function recursion(index) {

    let array = []

    for(let i = 0 ;i<index; i++) {

        array[i] = i + 1;

    }

    for(let i=0;i<array.length; i++) {

        let str = '';

        for(let x = 0 ; x<array[i];x++) {

            str=str+'!';

        }
        console.log(str);

        if(i == array.length-1) {

            for(let i = array.length;i>0; i--) {

                let str = '';             
    
                for(let x = 0; x<array[i] ; x++) {
    
                    str = str + '!';
    
                }
                
                console.log(str);
    
            }
            return

        }

        }

}

recursion(19);