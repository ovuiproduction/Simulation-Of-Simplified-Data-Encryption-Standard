import React, { useEffect, useState } from 'react';
import '../css/LSC1.css';

export default function LSC2({ leftShiftResult,onResultUpdate }) {
    const [newLeftNibble, setNewLeftNibble] = useState([]);
    const [newRightNibble, setNewRightNibble] = useState([]);
    const [detailedTextLeftNibble, setDetailedTextLeftNibble] = useState([]);
    const [detailedTextRightNibble, setDetailedTextRightNibble] = useState([]);
    const [result, setResult] = useState([]);

    const leftNibble = leftShiftResult.slice(0, leftShiftResult.length / 2);
    const rightNibble = leftShiftResult.slice(leftShiftResult.length / 2);

    useEffect(() => {
        const updateLeftNibble = () => {
            leftNibble.forEach((_, i) => {
                setTimeout(() => {
                    setNewLeftNibble((prev) => {
                        const newLeftNibble = [...prev];
                        newLeftNibble[i] = i < leftNibble.length - 2 ? leftNibble[i + 2] : leftNibble[i-3];
                        return newLeftNibble;
                    });
                    setDetailedTextLeftNibble((prev) => {
                        const newText = [
                            ...prev,
                            `newLeftNibble[${i}] = ${i < leftNibble.length - 2 ? `leftNibble[${i + 2}] = ${leftNibble[i + 2]}` : `leftNibble[${i-3}] = ${leftNibble[i-3]}`}`
                        ];
                        return newText;
                    });
                }, i * 1500); // Adjust the delay as needed
            });
        };

        const updateRightNibble = () => {
            rightNibble.forEach((_, i) => {
                setTimeout(() => {
                    setNewRightNibble((prev) => {
                        const newRightNibble = [...prev];
                        newRightNibble[i] = i < rightNibble.length - 2 ? rightNibble[i + 2] : rightNibble[i-3];
                        return newRightNibble;
                    });
                    setDetailedTextRightNibble((prev) => {
                        const newText = [
                            ...prev,
                            `newRightNibble[${i}] = ${i < rightNibble.length - 2 ? `rightNibble[${i + 2}] = ${rightNibble[i + 2]}` : `rightNibble[${i-3}] = ${rightNibble[i-3]}`}`
                        ];
                        return newText;
                    });
                }, i * 1500); // Adjust the delay as needed
            });
        };

        updateLeftNibble();
        updateRightNibble();

    }, [leftShiftResult]);

    useEffect(() => {
        if (newLeftNibble.length === leftNibble.length && newRightNibble.length === rightNibble.length) {
            const combinedResult = [...newLeftNibble, ...newRightNibble];
            setResult(combinedResult);
            if (onResultUpdate) {
                onResultUpdate(combinedResult);
            }
        }
    }, [newLeftNibble, newRightNibble]);

    return (
        <>
            <div className="lcs1-main-block">
                <h3>P10 Converted Key: 
                    <span className="bit-block">
                        {leftShiftResult.map((element, j) => (
                            <span key={j} className="bit-element">{element}</span>
                        ))}
                    </span>
                </h3>
                <div className='lsc1-main-block'>
                    <div className='lsc1-sub-block'>
                        <h3>Left Nibble: 
                            <span className="bit-block"> 
                                {leftNibble.map((element, j) => (
                                    <span key={`left-${j}`} className="bit-element">{element}</span>
                                ))}
                            </span>
                        </h3>
                        <div className='array-generation-block'>
                            {detailedTextLeftNibble.map((element, i) => (
                                <p className="generation-line" key={i}>{element}</p>
                            ))}
                        </div>
                        <h3>Updated Left Nibble: 
                            <span className="bit-block"> 
                                {newLeftNibble.map((element, j) => (
                                    <span key={`left-updated-${j}`} className="bit-element">{element}</span>
                                ))}
                            </span>
                        </h3>
                    </div>
                    <div className='lsc1-sub-block'>
                        <h3>Right Nibble: 
                            <span className="bit-block"> 
                                {rightNibble.map((element, j) => (
                                    <span key={`right-${j}`} className="bit-element">{element}</span>
                                ))}
                            </span>
                        </h3>
                        <div className='array-generation-block'>
                            {detailedTextRightNibble.map((element, i) => (
                                <p className="generation-line" key={i}>{element}</p>
                            ))}
                        </div>
                        <h3>Updated Right Nibble: 
                            <span className="bit-block"> 
                                {newRightNibble.map((element, j) => (
                                    <span key={`right-updated-${j}`} className="bit-element">{element}</span>
                                ))}
                            </span>
                        </h3>
                    </div>
                </div>
                <h3>Left Shift Result: 
                    <span className="bit-block"> 
                        {result.map((element, j) => (
                            <span key={`result-${j}`} className="bit-element">{element}</span>
                        ))}
                    </span>
                </h3>
            </div>
        </>
    );
}