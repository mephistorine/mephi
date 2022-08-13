import { Icon, Map as LeafletMap, Marker, TileLayer } from "leaflet"
import Head from "next/head"
import { useEffect } from "react"
import { getAllConferences } from "../data"
import { Conference } from "../domain"

export function TalksMap() {
  let map: LeafletMap

  useEffect(() => {
    if (map) {
      map.remove()
    }

    const conferences: readonly Readonly<Conference>[] = getAllConferences()

    // eslint-disable-next-line react-hooks/exhaustive-deps
    map = new LeafletMap("map-container", {
      zoom: 4,
      center: [ 45.035470, 38.975313 ],
      layers: [
        new TileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
          maxZoom: 19,
          attribution: "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors"
        })
      ]
    })

    for (const conference of conferences) {
      if (conference.location === "ONLINE") {
        continue
      }

      const marker = new Marker(conference.location.coordinates, {
        icon: new Icon({
          iconUrl: "https://api.iconify.design/el:map-marker.svg",
          iconSize: [ 24, 24 ]
        })
      })

      marker.setTooltipContent(conference.name)

      map.addLayer(marker)
    }
  })

  return <>
    <Head>
      <link rel="stylesheet" href="https://unpkg.com/leaflet@1.8.0/dist/leaflet.css" />
    </Head>

    <div className="h-[300px]" id="map-container"></div>
  </>
}
