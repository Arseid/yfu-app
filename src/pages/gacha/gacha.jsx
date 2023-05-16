import React from 'react';

const Gacha = () => {
    const [gachaResult, setGachaResult] = React.useState(null);

    const listTops = [{name:"Tshirt", probability:0.6}, {name:"Sweater", probability:0.3}, {name:"Turtleneck", probability:0.1}];
    const listBots = ["Jean","Sweat Pants","Costume Pants"];
    const listShoes = ["Airforce 1","Doc Martens","Stan Smith"];
    const listAll = [listTops,listBots,listShoes];

    const letsGacha = (itemList) => {
        const chance = Math.random();
        let cumulativeProbability = 0;
        for (const item of itemList) {
            cumulativeProbability += item['probability'];
            if (chance <= cumulativeProbability) {
                return item;
            }
        }
    }

    const roll1time = () => {
        const item = letsGacha(listTops);
        setGachaResult(item);
    }

    return <div className='Gacha'>
        <h1>Gacha</h1>
        <div style={{display: 'flex', alignSelf: 'center', justifyContent: 'center'}}>
            <button onClick={()=>roll1time()}>Let's roll the dice shall we</button>
            {gachaResult ? gachaResult['name'] : ''}
        </div>
    </div>
};

export default Gacha;
