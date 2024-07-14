import React, { useEffect, useState } from 'react';

export default function ConversionP8({leftShiftResult,p8,onResultUpdate}){
    
    const [p8ConvertedKey,setP8ConvertedKey] = useState([]);
    const [detailedText, setDetailedText] = useState([]);

    useEffect(() => {
        p8.forEach((index, i) => {
            setTimeout(() => {
                setP8ConvertedKey((prev) => {
                const newAnimatedKey = [...prev];
                newAnimatedKey[i] = leftShiftResult[index - 1];
                return newAnimatedKey;
              });
              setDetailedText((prev) => {
                const newText = [
                  ...prev,
                  `newKey[${i}] = key[P8[${i}]-1] = key[${index - 1}] = ${leftShiftResult[index - 1]}`
                ];
                return newText;
              });
            }, i * 1000); // Adjust the delay as needed
          });
    }, []);

    useEffect(()=>{
        if(p8ConvertedKey.length == 8){
            if(onResultUpdate){
              onResultUpdate(p8ConvertedKey);
            }
        }
    },[p8ConvertedKey]);


    return(
        <>
   <div className="result-number-block">
                <h3>
                  P8: 
                  <span className="bit-block">
                    {p8.map((element,j)=>(
                        <span key={j} className="bit-element">{element}</span>
                    ))}
                  </span>
                </h3>
                {detailedText.map((text, i) => (
                  <p className="generation-line" key={i}>{text}</p>
                ))}
                <h3>
                  New Key:{" "}
                  <span className="bit-block">
                  {p8ConvertedKey.map((char, i) => (
                    <span key={i} className="bit-element">
                      {char}
                    </span>
                  ))}
                  </span>
                </h3>
              </div>
        </>
    )
}