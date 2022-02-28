import {AfterViewInit, Component} from '@angular/core';
import * as L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet-routing-machine/dist/leaflet-routing-machine.css';
import {Archive} from "../../controller/model/archive.model";
import {ArchiveService} from "../../controller/service/archive.service";
import "leaflet/dist/leaflet.css"
import "leaflet-draw"
import "leaflet.animatedmarker/src/AnimatedMarker";
import {FeatureGroup, Marker} from "leaflet";

let iconDefault = L.icon({
  iconUrl:
    'assets/marker-icon-2x.png',
  popupAnchor: [1, -34] // point from which the popup should open relative to the iconAnchor
});

interface MovingMarkerDestination {
  latLng: L.LatLng;
  /** Time to travel to latLng point from previous latLng*/
  duration: number;
}

const icon = L.icon({
  iconSize: [25, 41],
  iconAnchor: [10, 41],
  popupAnchor: [2, -40],
  iconUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.6/dist/images/marker-shadow.png"
});

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})
export class ArchiveComponent implements AfterViewInit {

  public map: any;
  dataStart: Archive = new Archive();
  dataEnd: Archive = new Archive();
  private animatedMarker: any;

  constructor(private archiveService: ArchiveService) {
  }

  get coordonneList(): Array<Archive> {
    return this.archiveService.coordonneList;
  }

  set coordonneList(value: Array<Archive>) {
    this.archiveService.coordonneList = value;
  }


  ngAfterViewInit() {
    this.archiveService.findAll().subscribe(data => {
      this.coordonneList = data;
      this.createMap(this.coordonneList);
      console.log(data);

    }, error => {
      console.log(error);
    });
  }


  createMap(listCor: Array<Archive>) {
    const Tounes = {
      lat: 35.827815,
      lng: 10.64319
    };

    const ZoomLevel = 14;
    this.map = L.map('map', {
      center: [Tounes.lat, Tounes.lng],
      zoom: ZoomLevel
    });

    const mainLayer = L.tileLayer(
      'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      {
        minZoom: 3,
        maxZoom: 17,
        attribution: '&copy; Carte'
      }
    );
    for (const item of listCor) {
      L.marker([item.latitude, item.longitude]).addTo(this.map)
        .bindPopup(String(item.latitude + ' ' + item.longitude + ' <br>' + item.date),
          {autoClose: false, closeOnClick: false})
        .setIcon(iconDefault)
        .openPopup();
    }
    mainLayer.addTo(this.map);
  }

  getDerection() {
    console.log(this.dataStart);
    console.log(this.dataEnd);
    // @ts-ignore
    L.Routing.control({
      waypoints: [L.latLng(this.dataStart.latitude, this.dataStart.longitude), L.latLng(this.dataEnd.latitude, this.dataEnd.longitude)],
    }).addTo(this.map);


    L.marker([this.dataStart.latitude, this.dataStart.longitude]).addTo(this.map)
      .bindPopup(String(this.dataStart.latitude + ' ' + this.dataStart.longitude + ' <br>' + this.dataStart.date),
        {autoClose: false, closeOnClick: false})
      .setIcon(iconDefault)
      .openPopup();


    L.marker([this.dataEnd.latitude, this.dataEnd.longitude]).addTo(this.map)
      .bindPopup(String(this.dataEnd.latitude + ' ' + this.dataEnd.longitude + ' <br>' + this.dataEnd.date),
        {autoClose: false, closeOnClick: false})
      .setIcon(iconDefault)
      .openPopup();
    this.startAnimatiomMarker();

  }

  startAnimatiomMarker() {
    // @ts-ignore
    this.animatedMarker = L.animatedMarker([L.latLng(this.dataStart.latitude, this.dataStart.longitude),
      L.latLng(this.dataEnd.latitude, this.dataEnd.longitude)], {
      autoStart: true,
      loop: 2,
      interval: 15000, // milliseconds
      icon
    });

    this.map.addLayer(this.animatedMarker);

    // @ts-ignore
    let group: FeatureGroup<any> = new L.featureGroup([this.animatedMarker]);

    this.map.fitBounds(group.getBounds());

    this.map.addLayer(this.animatedMarker);
  }


}

