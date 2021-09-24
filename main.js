

let cities;

const getCities= () =>{
	return new Promise((resolve,reject)=>{
		let error=false;
		if(!error)		
			resolve(
				d3.csv('cities.csv', d3.autoType)
				.then(data=>{
					cities=data;
				})
			)
		else
			reject()
		})
}


function filterCities() {
	cities=cities.filter(city=>city.eu==true)
}

function renderText(){
	d3.select('.city-count').text(
		"Number of Cities Selected: "+cities.length)
}

function renderPlot(cities){
	const width=700;
	const height=550;
	const svg=d3.select('.population-plot')
		.append('svg')
		.attr('width',width)
		.attr('height',height)
	
	svg.selectAll('circle')
		.data(cities)
		.enter()
		.append("circle")
		.attr('cx',function(d){
			return d.x
		})
		.attr('cy',function(d){
			return d.y
		})
		.attr('r',function(d){
			if (d.population<1000000){
				return 4
			} else{return 8}
		})
		.attr('fill','blue')

	svg.selectAll('text')
		.data(cities)
		.enter()
		.append('text')
		.attr('x',function(d){
			return d.x
		})
		.attr('y',function(d){
			return d.y-12
		})
		.attr('font-size',11)
		.attr('text-anchor','middle')
		.text(function(d){
			if (d.population>=1000000){
				return d.city
			}
		})

}

getCities().then( temp =>{
	filterCities();
	renderText();
	renderPlot(cities);
})


let buildings;

const getBuildings= () =>{
	return new Promise((resolve,reject)=>{
		let error=false;
		if(!error)		
			resolve(
				d3.csv('buildings.csv', d3.autoType)
				.then(data=>{
					buildings=data;
				})
			)
		else
			reject()
		})
}


function filterBuildings() {
	buildings=buildings.sort(sortHeights);
}

function sortHeights(a,b){
	return b.height_ft-a.height_ft;
}

function renderBar(buildings){
	const width=600;
	const height=500;
	const svg=d3.select('.building-bar')
		.append('svg')
		.attr('width',width)
		.attr('height',height)

	svg.selectAll('rect')
		.data(buildings)
		.enter()
		.append('rect')
		.attr('width',function(d){
			return d.height_px
		})
		.attr('height',30)
		.attr('x',250)
		.attr('y',function(d,i){
			return (i)*50+20
		})
		.attr('fill','orange')
		.on('click',function(d,i){
			console.log(i)
			document.querySelector('#building-table').style.display='inline';
			d3.select('.image')
                .attr('src',/img/+i.image)
			document.querySelector('.building-name').innerText=String(i.building)
			document.querySelector('.height').innerText=String(i.height_ft)
			document.querySelector('.city').innerText=String(i.city)
			document.querySelector('.country').innerText=String(i.country)
			document.querySelector('.floors').innerText=String(i.floors)
			document.querySelector('.completed').innerText=String(i.completed)
		})

	svg.selectAll('text1')
		.data(buildings)
		.enter()
		.append('text')
		.attr('x',0)
		.attr('y',function(d,i){
			return (i)*50+40
		})
		.text(function(d){
			return d.building
		})
	
	svg.selectAll('text2')
		.data(buildings)
		.enter()
		.append('text')
		.attr('x',function(d){
			return 200+d.height_px
		})
		.attr('y',function(d,i){
			return (i)*50+40
		})
		.attr('text-anchor','start')
		.text(function(d){
			return d.height_ft+' ft'
		})
		
}

getBuildings().then( temp=>{
	filterBuildings();
	renderBar(buildings);
})
