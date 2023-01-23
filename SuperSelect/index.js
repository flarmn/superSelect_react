import React, { useEffect, useState } from "react"
import ReactDom from 'react-dom';
import "./index.css"

//import Tooltip from "../Tooltip"

const SuperSelect = (props) => {
	const {
		label = "Loading...",
		allowClear = true,
		placeholder,
		responsibilitiesList,
		positionsList,
	} = props


	let hintsFromPositionsArray = [];
	let delarray = [];
	let tmp_optionHints = ""

	let pretmpArr1 = [];


	let filtered = 0;
	let tmp  = [];

	let renderArray = [];
	let clearAllArray = [];
	let tmpInputArray = [];
	let delidx = -1;
	let somethingtmp = [];
	let bbb = [];


	


	const [selectAllDiabled, setSelectAllDiabled] = useState(1);
	const [clearAllDiabled, setclearAllDiabled] = useState(1);

	const [selectedPos, setselectedPos] = useState([]);
	const [pannelVisibility, setPanelVisibility] = useState(1);
	const [hints, setHints] = useState();
	const [removedItems, setRemovedItems] = useState([]);

	const [clearHints, setclearHints] = useState(0);


	useEffect(() => {
		let selectedPos = $(this).val();
		/////console.log("useEffect")
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
		$(document).on('change', '#candidates-0-position_ids', function(){
			setHintsFromPositions( $(this).val() );
		});

	},
		[]);


	/* POSITIONS ACTIONS */
	const setHintsFromPositions = (selectedPosId) =>{
		hintsFromPositionsArray.length = 0;
		
		if(selectedPosId != ''){
			positionsList.map(positionItem=>{

				if(positionItem.id == selectedPosId && positionItem.responsibilities){
					hintsFromPositionsArray = positionItem.responsibilities.split(';;');
				}
				
			})

			

			//let currentInput = [];

			let currentInput = $('#search-input').val() || [];

			let hintsFromPositionsArray_tmp = [];

			hintsFromPositionsArray.map(positems=>{
				if(!currentInput.includes(positems)){
					hintsFromPositionsArray_tmp.push(positems)
				}
			})

			//hintsFromPositionsArray = hintsFromPositionsArray_tmp;

			console.log('currentInput', $('#search-input').val() )
			console.log("hintsFromPositionsArray", hintsFromPositionsArray)
			console.log('hintsFromPositionsArray_tmp', hintsFromPositionsArray_tmp)


			
			console.log("hintsFromPositionsArray initial", hintsFromPositionsArray)
			setselectedPos(hintsFromPositionsArray)
			//hintsFromPositionsArray.length = 0;
			tmpInputArray.length = 0;
			bbb.length = 0;
			renderArray = hintsFromPositionsArray_tmp;
			//bbb = hintsFromPositionsArray_tmp;
			if(hintsFromPositionsArray.length  > 0){
				setSelectAllDiabled(0);
			}else{
				setSelectAllDiabled(1);
			}
			
			//renderall(renderArray);
			renderHints(renderArray)
		}else{
			setselectedPos([])
		
			hintsFromPositionsArray.length = 0;
			tmpInputArray.length = 0;
			bbb.length = 0;
			renderArray = [];

			//renderall(renderArray);
			renderHints(renderArray)
		}

	}


	/* SELECT SEARCH ACTIONS  */
	function checkDelorAddResp(dataFromInput){
		somethingtmp = [];
		let notinclude = 0;
		let prevdata = [];
		let minusbox = dataFromInput
		///delarray.length = 0;
		///respSelectedArray.length = 0;
		
		
		console.log('hintsFromPositionsArray', hintsFromPositionsArray)

		if(dataFromInput && dataFromInput.length > 0){
			dataFromInput.map(inpel=>{
				if(hintsFromPositionsArray.includes(inpel) && dataFromInput.length > 0){
					setclearAllDiabled(0);
				}
			})
		}else{
			setclearAllDiabled(1);
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
			// CHECKING WE DELETTING OR ADDING ITEMS
			if( pretmpArr1[0] 
				&& pretmpArr1[1] 
				&& pretmpArr1[0] != null
				&& pretmpArr1[1] != null
				&& typeof(pretmpArr1[0]) !== "undefined"
				&& typeof(pretmpArr1[1]) !== "undefined"
				&& (pretmpArr1[pretmpArr1.length-1].length > pretmpArr1[pretmpArr1.length-2].length ) ){

				tmp.length = 0;
				console.log("ADD 2")
				//selectToHintsLoadBalancer();
			}else{ 
				
				console.log("CLEAR ALL HINTS DEL", clearHints)

				if(respSelectedArray && respSelectedArray.length>1){
					respSelectedArray.length = 0;
				}
		
			
			
				//console.log("hintsFromPositionsArray DEL", hintsFromPositionsArray, selectedPos)
				if(typeof(somethingtmp[0]) !== "undefined"){
					
					somethingtmp[0].map(el=>{
						if(somethingtmp[1] && !somethingtmp[1].includes(el) && hintsFromPositionsArray && hintsFromPositionsArray.includes(el)){
							filtered = parseInt(somethingtmp[1]);
							
							filtered = parseInt(el);
							notinclude = 0;
							//renderArray = renderArray;
						/*
							
							if(!tmp.includes(filtered)){
								tmp.push(filtered)	
							}
							*/
						
							//renderArray = delarray;
							//prevdata = renderArray;

							
						}else{
							//filtered = [];
							console.log("NOT ICLUDE")
							notinclude = 1;
							//renderArray = renderArray;
						}


						
						

						/*
						if(bbb.includes(filtered)){
							bbb.push(filtered)
						}
						*/
						
						
						//console.log("bbb", bbb)
						
						
					})
					
					if(hintsFromPositionsArray && dataFromInput){
						hintsFromPositionsArray.map(prt=>{
							if(!dataFromInput.includes(prt) && !bbb.includes(prt) ){
								bbb.push(prt)
							}
						})
					}
/*
					console.log("minusbox", minusbox)
					console.log("tmp", tmp)
					console.log("hints", hints)
*/

			
					if(clearAllArray && clearAllArray.length < 1 ){
						setSelectAllDiabled(0);
						//renderall( [...bbb]);
						//selectToHintsLoadBalancer();
						console.log("DEL bbb", bbb)
						renderHints([...bbb])
					}
						setclearHints(0);
						console.log("clearHints CLICKED in place del 2", clearHints)
						console.log("hints", renderArray)
				}
				
				console.log("DELETE 2")
			}
		}
		
	}
			
	
	const sethit = (e) =>{

		let selectedHit = $(e.target).attr("data-id");

		if (!respSelectedArray.includes(selectedHit)) {
			respSelectedArray.push(selectedHit);
		}

		delarray = hints.filter(function (item) {
			return item != selectedHit
		});

		console.log('delarray', delarray)
		

		//$('#search-input').val(respSelectedArray).trigger("change");

		

		renderArray = delarray;

		setRemovedItems(hints);

		renderArray.length > 0 ? setSelectAllDiabled(0) : setSelectAllDiabled(1)
		//renderall(renderArray);

		
		renderSelect( $('#search-input').val() && $('#search-input').val() != null ? [...respSelectedArray, ...$('#search-input').val()] : respSelectedArray );
		renderHints(renderArray);
		

		//selectToHintsLoadBalancer(respSelectedArray);

		///deleteHints(delarray);

		e.stopPropagation();
	}


	const setAllHints = (e) => {
		//console.log('tmp...',tmp)
		respSelectedArray.length = 0;
		tmp.length = 0;
		renderArray.length = 0;
		
		let inparr_tmp = $('#search-input').val();
		console.log('inparr_tmp', inparr_tmp)
		let outparr = ( inparr_tmp ? [...inparr_tmp, ...hints] : hints);
		console.log('outparr', outparr)
		$('#search-input').val(outparr).trigger("change");
		renderall(renderArray);
		setSelectAllDiabled(1);

		e.stopPropagation();
	}

	
	const clearAllHints = (e) => {
		
		console.log('selectedPos', selectedPos)
		let tmparr = $('#search-input').val();

		if(selectedPos && selectedPos.length > 0 && tmparr){
		
			tmparr.map(elms=>{
				if(selectedPos.includes(elms)){
					clearAllArray.push(elms)
				}else{
					renderArray.push(elms)
				}
			})

			renderHints(hintsFromPositionsArray);
			renderSelect([]);
			
			setclearAllDiabled(1);
		}
		
		e.stopPropagation();
		

		setclearHints(1);
		console.log("clearHints CLICKED in place", clearHints)
	}

	// DEL LATER
	let renderall = (renderArray) => {
		setHints(renderArray ? [...renderArray] : [])
	}



	let renderSelect = (selectOutput) =>{
		$('#search-input').val(selectOutput).trigger("change");
	}

	let renderHints = (renderArray) =>{
		console.log("renderArray", renderArray)
		setHints(renderArray ? [...renderArray] : [])
	}
			
	
	//  GENEERATING HINTS HTML OUTPUT
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


	
	/* PANEL ACTIONS */
	const hidePanel = (e) =>{
		setPanelVisibility(0);
		e.stopPropagation();
	}

	const showpanel = (e) =>{
		setPanelVisibility(1);
		e.stopPropagation();
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
								<div className={`btn select-all-btn ${selectAllDiabled == 1 ? 'btn-disbld disabled' : ''} `} onClick={setAllHints}>Select All</div>
								<div className={`btn clear-all-btn ${clearAllDiabled == 1 ? 'btn-disbld disabled' : ''} `} onClick={clearAllHints}>Clear All</div>
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