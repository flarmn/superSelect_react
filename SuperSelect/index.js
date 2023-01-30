import React, { useEffect, useState } from "react"
import ReactDom from 'react-dom';
import "./index.css"

//import Tooltip from "../Tooltip"

let inputDataArray = [];
let hintsDataArray = [];
let tmp_optionHints = [];
let somethingtmp = [];
let pretmpArr1 = [];
let tmpInputArray = [];
let hintsFromPositionsArr = [];
let clearAllArray = [];
let filtered = 0;
let delidx = -1;
	
let delarray = [];

const SuperSelect = (props) => {
	const {
		label = "Loading...",
		allowClear = true,
		placeholder,
		responsibilitiesList,
		positionsList,
	} = props


	const [hintsFromPositionsArray, setHintsFromPositionsArray] = useState([])

	const [selectAllDiabled, setSelectAllDiabled] = useState(1);
	const [clearAllDiabled, setclearAllDiabled] = useState(1);


	const [pannelVisibility, setPanelVisibility] = useState(1);
	const [hints, setHints] = useState();





	useEffect(() => {
		console.log("use efect rendered")
		let selectedPos = $(this).val();
		/* Initilizing SELECT2 elements */
		$(`#search-input`).select2({
			formatNoMatches: () => noRecordsFound,
			allowClear,
			placeholder: placeholder || "Choose " + label,
		})

	
		/* Adding options from array of objects */
		if(typeof(responsibilitiesList) !== "undefined" && $('#search-input').val() == null && $('#search-input').val() < 1){
			responsibilitiesList.map(optionsData => {
				$('#search-input').append(new Option(optionsData.name, optionsData.id, false, false));
			})
		}


		/* Handling changes in SuperSelect search input */
		$(document).on('change', '#search-input',function(e){
			checkDelorAddResp( $(this).val() );
			e.stopPropagation();
		});
		


		/* Catching changes at POSITIONS select  (ClientCandidate -> DepartmentAndPositions->Select)*/
		$(document).on('change', '#candidates-0-position_ids', function(e){
			
			setHintsFromPositions( $(this).val() );
			e.stopPropagation();
		});

	},
		[]);

	/* POSITIONS ACTIONS */
	const setHintsFromPositions = (selectedPosId) =>{
		
		let inputtedArr = $('#search-input').val();
		hintsFromPositionsArr = [];
		inputDataArray = [];
		hintsDataArray = [];
		
		if(selectedPosId != ''){

			positionsList.map(positionItem=>{
				if(positionItem.id == selectedPosId && positionItem.responsibilities){
					hintsFromPositionsArr = positionItem.responsibilities.split(';;');
				}
			})

			/*
			if(hintsFromPositionsArr.length  > 0){
				setSelectAllDiabled(0);
			}else{
				setSelectAllDiabled(1);
			}
			*/


			let hintsFromPositionsArr_tmp = hintsFromPositionsArr.filter(function(value){
				return inputtedArr ? !inputtedArr.includes(value) : [];
			});
			setHintsFromPositionsArray(hintsFromPositionsArr_tmp)
			renderHints(hintsFromPositionsArr_tmp)
		}else{
			hintsFromPositionsArr = [];
			inputDataArray = [];
			hintsDataArray = [];
			renderHints([])
		}
	}


	/* SELECT INPUT ACTIONS  */
	function checkDelorAddResp(dataFromInput){
		console.log("hintsDataArray from checkDelorAddResp func begin", hintsDataArray)
		somethingtmp = [];
	
		if(dataFromInput && dataFromInput.length > 0){
			dataFromInput.map(inpel=>{
				if(hintsFromPositionsArray.includes(inpel) && dataFromInput.length > 0){
					//setclearAllDiabled(0);
				}
			})
		}else{
			//setclearAllDiabled(1);
		}

		pretmpArr1.push( dataFromInput != null ? dataFromInput : [] );

		delidx++;

		tmpInputArray[delidx] = (dataFromInput != null ? dataFromInput : []);

		if(tmpInputArray[0] && tmpInputArray[1] && (tmpInputArray[0].length > tmpInputArray[1].length) ) {
			somethingtmp[0] = tmpInputArray[0];
			somethingtmp[1] = tmpInputArray[1];
		}else{
			somethingtmp[0] = tmpInputArray[1];
			somethingtmp[1] = tmpInputArray[0];
		}


		if(delidx >= 1 ){delidx = -1; }
		
		if(pretmpArr1 != [] && pretmpArr1 != null){

			console.log('pretmpArr1', pretmpArr1[pretmpArr1.length-1], pretmpArr1[pretmpArr1.length-2] )

			// CHECKING WE DELETTING OR ADDING ITEMS
			if( typeof(pretmpArr1[pretmpArr1.length-2]) == "undefined" || pretmpArr1[pretmpArr1.length-2] == []){

				hintsDataArray = hintsFromPositionsArr.filter(function(value){
					return dataFromInput ? !dataFromInput.includes(value) : [];
				});	

				renderHints([...hintsDataArray]);
				//console.log("FIRST ADD");	
			}else if( pretmpArr1[0] 
				&& pretmpArr1[1] 
				&& pretmpArr1[0] != null
				&& pretmpArr1[1] != null
				&& typeof(pretmpArr1[0]) !== "undefined"
				&& typeof(pretmpArr1[1]) !== "undefined"
				&& (pretmpArr1[pretmpArr1.length-1].length > pretmpArr1[pretmpArr1.length-2].length ) ){

				hintsDataArray = hintsFromPositionsArr.filter(function(value){
					return dataFromInput ? !dataFromInput.includes(value) : [];
				});	

				renderHints([...hintsDataArray]);
				//console.log("ADD 2")
			}else{ 

				if(typeof(somethingtmp[0]) !== "undefined"){
	
					somethingtmp[0].map(el=>{
						if(somethingtmp[1] && !somethingtmp[1].includes(el) ){
							filtered = somethingtmp[1];
							filtered = el;
						}else{
							//console.log("NOT ICLUDE")
						}
					})
					
					if(hintsFromPositionsArr.includes(filtered)){
						if(!hintsDataArray.includes(filtered) ){
							hintsDataArray.push(filtered);
						}
					}
					
					renderHints([...hintsDataArray]);

					inputDataArray = hintsFromPositionsArr.filter(function(value){
						return hintsDataArray ? !hintsDataArray.includes(value) : [];
					});
				}
				//console.log("DELETE 2")
			}
		}
		
	}
			
	
	let sethit = (e) =>{
		
		hintsDataArray = [];

		let selectedHit = $(e.target).attr("data-id");
		let inpArr = $('#search-input').val();
		
		if(!inputDataArray.includes(selectedHit)) {
			inputDataArray.push(selectedHit);
		}
		
		hintsDataArray = hintsFromPositionsArr.filter(function(value){
			return inputDataArray ? !inputDataArray.includes(value) : [];
		});

		renderSelect(  inpArr ? [...inputDataArray, ...inpArr] :  inputDataArray );
		renderHints([...hintsDataArray]);
		
		e.stopPropagation();
	}


	const setAllHints = (e) => {
		let inparr_tmp = $('#search-input').val();
		hintsDataArray = [];
		inputDataArray = [];
		let outparr = ( inparr_tmp ? [...inparr_tmp, ...hintsFromPositionsArr] : hintsFromPositionsArr );
		renderSelect(outparr);
		renderHints([]);
		e.stopPropagation();
	}

	
	const clearAllHints = (e) => {
		let tmparr = $('#search-input').val();
		inputDataArray = [];
		hintsDataArray = [];
		renderSelect(inputDataArray);
		renderHints( hintsFromPositionsArr );
		inputDataArray = [];
		e.stopPropagation();
	}

	
	/*  GENEERATING HINTS HTML OUTPUT ----------------------------------------- */
	let optionHints	= Object.values(responsibilitiesList).map(resp => {
		if(hints){

			tmp_optionHints = hints.map((item) => {
				if(item == resp.id){
					return (
						<span key={Date.now()} data-id={item} onClick={sethit} >{resp.name}</span>
					)
				}
			})
	
			return tmp_optionHints;
		}
		
	})


	
	/* PANEL ACTIONS ------------------------------------------------------------ */
	const hidePanel = (e) =>{
		setPanelVisibility(0);
		e.stopPropagation();
	}

	const showpanel = (e) =>{
		setPanelVisibility(1);
		e.stopPropagation();
	}

	const setButtonsStatus = (renderArray) =>{
		console.log("checking buttons", 'renderArray', renderArray, 'inputDataArray', inputDataArray, 'hintsDataArray', hintsDataArray, "$('#search-input').val()", $('#search-input').val(), 'hints', hints )
		$('#search-input').val() ? setclearAllDiabled(0) : setclearAllDiabled(1);
		renderArray && renderArray.length > 0 && hintsDataArray ? setSelectAllDiabled(0) : setSelectAllDiabled(1);
	}



	/* RESULTS RENDER ------------------------------------------------------------ */ 
	let renderSelect = (selectOutput) =>{
		setButtonsStatus(selectOutput);
		$('#search-input').val(selectOutput).trigger("change");
	}

	let renderHints = (renderArray) =>{
		setButtonsStatus(renderArray);
		setHints(renderArray);
	}
	
	
				
	return (
		<>

			<div className="super-select-wraper">
				<div className="super-select-container">
					<div className="super-select-label-container">
						<label className="super-select-label">Responsibilities</label>
					</div>

					<select className="search-input tags select2 select2-multiple form-control" id="search-input"
						data-placeholder="Responsibilities list"
						multiple="multiple"
						>
					</select>


					{pannelVisibility == 0
					? 
					<div className = "open-pannel-container">
						<i className="fa fa-eject" aria-hidden="true" onClick={showpanel}></i>
					</div>
					: ''
					}
					<div className={`total-items-list-container ${pannelVisibility == 0 ? 'hide' : ''} `}>
						<div className="items-btn-container">
							<div className="btns-stack">
								<div className={`btn select-all-btn ${selectAllDiabled == 1 ? 'btn-disbld disabled' : ''} `} onClick={ selectAllDiabled == 0 ? setAllHints : undefined } >Select All</div>
								<div className={`btn clear-all-btn ${clearAllDiabled == 1 ? 'btn-disbld disabled' : ''} `} onClick={ clearAllDiabled == 0 ? clearAllHints : undefined }>Clear All</div>
							</div>

							<span className="items-cancel-btn" onClick = {hidePanel}>+</span>

						</div>

						<div className="total-items-list">
							{hints && hints.length > 0 || typeof(selresp) !== "undefined" ? optionHints : 'No positions with assigned responsibilities selected'}
						</div>
					</div>
				</div>
			</div>
		</>

	)

}

export default SuperSelect