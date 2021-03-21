import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// declare let L;
import * as L from 'leaflet';
import '../../../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.js'
import { HttpClient } from '@angular/common/http';
import { DashboardService } from 'services/dashboard.service.js';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import * as Chart from 'chart.js';


let showInfo: boolean = false;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  providers: [DashboardService]
})

export class DashboardComponent implements OnInit {

  // @ViewChild('map', { static: false }) map: ElementRef;
  topClientChart: any;
  map: any;
  districtList: any[];
  public form: FormGroup;
  obstacleLayer: any;
  piechart: any;
  topClients: { 'topclient': { 'usage': string; 'client': string; }[]; };
  statesList = [{ key: 1, value: 'AL' },
  { key: 2, value: 'AK' },
  { key: 3, value: 'AZ' },
  { key: 4, value: 'AR' },
  { key: 5, value: 'CA' },
  { key: 6, value: 'CO' },
  { key: 7, value: 'CT' },
  { key: 8, value: 'DE' },
  { key: 9, value: 'DC' },
  { key: 10, value: 'FL' },
  { key: 11, value: 'GA' },
  { key: 12, value: 'HI' },
  { key: 13, value: 'ID' },
  { key: 14, value: 'IL' },
  { key: 15, value: 'IN' },
  { key: 16, value: 'IA' },
  { key: 17, value: 'KS' },
  { key: 18, value: 'KY' },
  { key: 19, value: 'LA' },
  { key: 20, value: 'ME' },
  { key: 21, value: 'MD' },
  { key: 22, value: 'MA' },
  { key: 23, value: 'MI' },
  { key: 24, value: 'MN' },
  { key: 25, value: 'MS' },
  { key: 26, value: 'MO' },
  { key: 27, value: 'MT' },
  { key: 28, value: 'NE' },
  { key: 29, value: 'NV' },
  { key: 30, value: 'NH' },
  { key: 31, value: 'NJ' },
  { key: 32, value: 'NM' },
  { key: 33, value: 'NY' },
  { key: 34, value: 'NC' },
  { key: 35, value: 'ND' },
  { key: 36, value: 'OH' },
  { key: 37, value: 'OK' },
  { key: 38, value: 'OR' },
  { key: 39, value: 'PA' },
  { key: 40, value: 'RI' },
  { key: 41, value: 'SC' },
  { key: 42, value: 'SD' },
  { key: 43, value: 'TN' },
  { key: 44, value: 'TX' },
  { key: 45, value: 'UT' },
  { key: 46, value: 'VT' },
  { key: 47, value: 'VA' },
  { key: 48, value: 'WA' },
  { key: 49, value: 'WV' },
  { key: 50, value: 'WI' },
  { key: 51, value: 'WY' }]

  obstaclesType = [{ key: 1, value: 'RIG' },
  { key: 2, value: 'STACK' },
  { key: 3, value: 'BLDG' },
  { key: 4, value: 'TOWER' },
  { key: 5, value: 'POLE' },
  { key: 6, value: 'ELEC SYS' },
  { key: 7, value: 'T-L TWR' },
  { key: 8, value: 'TANK' },
  { key: 9, value: 'BRIDGE' },
  { key: 10, value: 'SIGN' },
  { key: 11, value: 'REFINERY' },
  { key: 12, value: 'FENCE' },
  { key: 13, value: 'PLANT' },
  { key: 14, value: 'GEN UTIL' },
  { key: 15, value: 'ELEVATOR' },
  { key: 16, value: 'ANTENNA' },
  { key: 17, value: 'NAVAID' },
  { key: 18, value: 'CTRL TWR' },
  { key: 19, value: 'UTILITY POLE' },
  { key: 20, value: 'CRANE' },
  { key: 21, value: 'BLDG-TWR' },
  { key: 22, value: 'VERTICAL STRUCTURE' },
  { key: 23, value: 'AG EQUIP' },
  { key: 24, value: 'CATENARY' },
  { key: 25, value: 'DOME' },
  { key: 26, value: 'SOLAR PANELS' },
  { key: 27, value: 'MET' },
  { key: 28, value: 'AMUSEMENT PARK' },
  { key: 29, value: 'MONUMENT' },
  { key: 30, value: 'COOL TWR' },
  { key: 31, value: 'DAM' },
  { key: 32, value: 'WINDMILL' },
  { key: 33, value: 'POWER PLANT' },
  { key: 34, value: 'TRAMWAY' },
  { key: 35, value: 'BALLOON' },
  { key: 36, value: 'SPIRE' },
  { key: 37, value: 'LANDFILL' },
  { key: 38, value: 'STADIUM' },
  { key: 39, value: 'SILO' },
  { key: 40, value: 'HEAT COOL SYSTEM' },
  { key: 41, value: 'WINDSOCK  ' },
  { key: 42, value: 'LGTHOUSE' },
  { key: 43, value: 'PIPELINE PIPE' },
  { key: 44, value: 'WALL' },
  { key: 45, value: 'HANGAR' },
  { key: 46, value: 'ARCH' },
  { key: 47, value: 'GRAIN ELEVATOR' },
  { key: 48, value: 'WIND INDICATOR' }]

  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private dashboardService: DashboardService) {

  }

  ngOnInit() {

    this.initializeValidators();
    // this.map = L.map('map').setView([13.0827, 80.2707], 13);
    // L.tileLayer('http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}', {
    //   maxZoom: 20,
    //   subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
    // }).addTo(this.map);
    this.getTopClient();
 
  }

  onStateChange(event) {

  }

  onObstacleTypeChange(event) {

  }

  onOpen() {

  }

  // loadMap() {
  //   if (this.form.valid) {
  //     let params = {
  //     };

  //     let cqlFilter = '';
  //     if (this.form.value) {
  //       if (this.form.value.state) {
  //         cqlFilter = 'STATE=' + '\'' + this.form.value.state + '\'';
  //       }
  //       if (this.form.value.obstacleType) {
  //         if (cqlFilter) {
  //           cqlFilter += ' and ';
  //         }
  //         cqlFilter += 'TYPE=' + '\'' + this.form.value.obstacleType + '\'';
  //       }
  //     }

  //     if (cqlFilter) {
  //       params = {
  //         typeName: 'GarudaGIS:DOF',
  //         maxFeatures: 1000,
  //         srsName: 'EPSG:4326',
  //         outputFormat: 'application/json',
  //         cql_filter: cqlFilter,
  //       };
  //     } else {
  //       params = {
  //         typeName: 'GarudaGIS:DOF',
  //         maxFeatures: 1000,
  //         srsName: 'EPSG:4326',
  //         outputFormat: 'application/json'
  //       };
  //     }

  //     debugger;
  //     this.dashboardService.getGeoServerData(params).subscribe(result => {

  //       if (this.obstacleLayer) {
  //         this.map.removeLayer(this.obstacleLayer);
  //       }

  //       const polystyle = {
  //         fillColor: '#FF9933',
  //         weight: 2,
  //         opacity: 1,
  //         color: 'red',
  //         fillOpacity: 0.3
  //       };
  //       debugger;
  //       // const jsonData = JSON.parse(result);

  //       this.fitMapToBoundsWithGeojsonPointsData(result);

  //       this.obstacleLayer = new L.geoJSON(result, {
  //         // style: polystyle,
  //         style: (feature) => {
  //           return polystyle;
  //         },
  //         // onEachFeature: this.onBoundayFeatureClicked
  //       });
  //       this.map.addLayer(this.obstacleLayer);
  //     });
  //   } else {
  //     this.validateFormControl();
  //   }
  // }

  validateFormControl() {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({
          onlySelf: true
        });
      }
    })
  }

  initializeValidators() {
    this.form = this.formBuilder.group({
      state: ['', [Validators.required]],
      obstacleType: [''],
    });
  }

  // fitMapToBoundsWithGeojsonData(data: any) {
  //   if (data && data.features && data.features.length > 0) {
  //     const latlngs = [];
  //     for (let i = 0; i < data.features[0].geometry.coordinates.length; i++) {
  //       const coord = data.features[0].geometry.coordinates[i];
  //       for (let j = 0; j < coord.length; j++) {
  //         const points = coord[j];
  //         for (let k = 0; k < points.length; k++) {
  //           latlngs.push(L.GeoJSON.coordsToLatLng(points[k]));
  //         }
  //       }
  //     }
  //     this.map.fitBounds(latlngs);
  //   }
  // }

  // fitMapToBoundsWithGeojsonPointsData(data) {
  //   if (data && data.features && data.features.length > 0) {
  //     const latlngs = [];
  //     for (let z = 0; z < data.features.length; z++) {
  //       latlngs.push(L.GeoJSON.coordsToLatLng(data.features[z].geometry.coordinates));
  //     }
  //     this.map.fitBounds(latlngs);
  //   }
  // }

  // onBoundayFeatureClicked(feature: any, layer: any) {
  //   layer.on({
  //     click: this.onFeatureCliecked
  //   });
 
  // }

  onFeatureCliecked() {

  }
  getTopClient() {
    this.topClients = {
      "topclient": [{
        "usage": "3.0",
        "client": "2017-18"
      },
      {
        "usage": "1.8",
        "client": "2018-19"
      },
      {
        "usage": "1.2",
        "client": "2019-20"
      }
  
      ]
    }
    let label = this.topClients.topclient.map(function (item) {
      return item.client;
    });
    let data1 = this.topClients.topclient.map(function (item) {
      return item.usage;
    });
    const itDept = '#ec1194';
    const agriDept = '#673594';
    const healthDept = 'blue';
    const ruralDept = 'yellow';
    const transportDept = 'green';
    const chartData = {
      labels: label,
      datasets: [
        {
          type: 'bar',
          label: 'Dept of IT',
          backgroundColor: itDept,
          data: data1,
          borderColor: itDept,
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'Dept of Agri',
          backgroundColor: agriDept,
          data: data1,
          borderColor: agriDept,
          borderWidth: 2,
        },
        {
          type: 'bar',
          label: 'Dept of Health',
          backgroundColor: healthDept,
          data: data1,
          borderColor: healthDept,
          borderWidth: 2
        },
        {
          type: 'bar',
          label: 'Dept of Rural',
          backgroundColor: ruralDept,
          data: data1,
          borderColor: ruralDept,
          borderWidth: 2
        },
        {
          type: 'bar',
          label: 'Dept of Transport',
          backgroundColor: transportDept,
          data: data1,
          borderColor: transportDept,
          borderWidth: 2
        },
      ]

    };
    if (this.topClientChart) {
      this.topClientChart.destroy();
    }
    this.topClientChart = new Chart('topClientChart', {
      type: 'bar',
      data: chartData,
      options: {
        responsive: true,
        title: {
          display: true,
          text: 'Top 5 IT Budgets'
        },
        tooltips: {
          mode: 'index',
          intersect: true
        },
        scales: {
          yAxes: [{
            type: 'linear',
            display: true,
            position: 'left',
            id: 'y-axis-1',
          }, {
            type: 'linear',
            display: true,
            position: 'right',
            id: 'y-axis-2',

            // grid line settings
            gridLines: {
              drawOnChartArea: false, // only want the grid lines for one axis to show up
            },
          }],
        }
      }
    });

    
  }
  getPieChart()
  {
    
    this.piechart = new Chart('piechart', {
      type: 'pie',
      data: {
        labels: [
          'Red',
          'Yellow',
          'Blue'
        ],
        data: [10, 20, 30]
      },
      options: {
        rotation: 1 * Math.PI,
        title: {
          display: true,
          fontSize: 20,
          text: 'Total Parts - ' + 60
        },
        circumference: 1 * Math.PI,
        legend: {
          display: false,
          position: 'right',
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        },
      }
    });
  }

}
