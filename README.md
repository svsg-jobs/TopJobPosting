# FEED.SVSG
**Ziel und Zweck**
Die Spitalverbunde St.Gallen stellen einen Feed ihrer veröffentlichten Stellenanzeigen Partnern zur Verfügung. Damit eröffnet sich ihnen die Möglichkeit, aktuell und automatisiert die notwendigen Daten zu beziehen für die Verarbeitung und weitere Verbreitung der Stellenanzeigen.  
Angeschlossene Firmen
- (geplant) Kantonsspital St.Gallen, SV1  
- (geplant) Spitalregion Rheintal Werdenberg Sargans, SV2  
- (geplant) Spital Linth, SV3  
- Spitalregion Fürstenland Toggenburg, SV4  

**Zielgruppe**  
Der Inhalt dieser Seiten richtet sich an Implementierungsverantwortliche. Basiskenntnisse zu HTTP, XML, XSLT, HTML und CSS werden erwartet.

**Inhalt**  
- [Partner](#partner). Der Feed wird in Absprache für den jeweiligen Partner konfiguriert. Der Abschnitt erklärt die Zusammenarbeit und die Schritte zur Implementierung des Feeds.  
- [Stellenanzeige](#stellenanzeige). Die Stellenanzeigen sind einheitlich strukturiert, unterscheiden sich aber im Layout. Die Struktur der Stellenanzeigen wird in diesem Abschnitt erläutert.  
- [Stellenliste](#stellenliste). Die Auflistung der Stellenanzeigen sind einheitlich strukturiert, unterscheiden sich aber im Layout.  
- [Feed](#feed). Erklärungen zu Struktur und Felder des Feeds.  

# Partner
Die Spitalverbunde St.Gallen ermöglicht kommerziellen und nicht kommerziellen Firmen und Organisationen den Stellenanzeigen-Feed zu nutzen. Mit jeder Oragnisation wird ein partnerschaftliches Verhältnis angestrebt. Die Partnerschaft kann auf Wunsch hin vertraglich vereinbart werden.

Partner können über eine vereinbarte Partner-URL auf ihren Feed zugreifen. Für den Zugriff ist eine Basic Auth Authentifizierung vorgesehen. 

## Partner werden
Jede Implementierung ist Partnerspezifisch und erfolgt als Projekt.
### Projekt Phasen
1. Studium dieser Seiten
1. Studium der Feldstruktur der Felder des Feeds, der Felder der Stellenanzeigen und deren Auswahloptionen
1. Felder und Filterkriterien für die jeweilige Nutzung definieren
1. Kontaktnahme mit marketing.hr@kssg.ch
1. Entwurf der Projekt Roadmap und der Projektzusammenarbeit
1. Entwurf Zusammenarbeitsvereinbarung
1. Klären von Datenschutz und Informationssicherheit
1. Verhandlung und Vereinbarung der Zusammenarbeit
1. Implementierung
1. Testing
1. Debug
1. GoLive

# Stellenanzeige
Bevor auf den Feed eingegangen wird, soll das Endprodukt, die Stellenanzeige, verstanden werden. Sie hat für alle angeschlossenen Spitäler die selbe Datenstruktur.

Die Vorlagendateien zu den Stellenanzeigen finden sich im [/docs](docs) Verzeichnis und bilden das erwartete Ergebnis ab.  
In der Voransicht liegen beispielhafte Stellenanzeigen vor. Beachte, dass darin die weiterführenden Links wegen ihres Beispielcharkaters womöglich nicht funktionieren.
- Beispielanzeige im [Layout SV1](https://svsg-jobs.github.io/TopJobPosting/LayoutSV1.html)  
- Beispielanzeige im [Layout SV4](https://svsg-jobs.github.io/TopJobPosting/LayoutSV4.html)

Die Vorlagen basieren auf einer gemeinsamen Codebasis für HTML, CSS und Skripte. Es wurden Anpassungen vorgenommen, um die CI/CD-Anforderungen jeder Marke, mit angemessenem Aufwand, zu erfüllen. Das Layout der Vorlagen ist so konzipiert, dass es Mobile First und Fluid ist.  
Der Internet Explorer wird nicht mehr unterstützt, auch nicht im Kompatibilitätsmodus von Edge.

Die zugrunde liegende Datenstruktur ist für alle Kunden/Marken einheitlich und wird im XML-Format bereitgestellt, das auch die Metadaten der einzelnen Stellenausschreibungen enthält.

Tracking-Codes sind derzeit nicht in den Vorlagen enthalten. Kommen sie später hinzu, ist deren Umsetzung bis einschließlich zum Gerät des Kunden vorzusehen.

## Struktur
* Metadaten
* Stylesheets  
* <details>
  <summary>Kopfzeile</summary>

  * Logo
  </details>

* <details>
  <summary>Anzeige</summary>
  
  * Hintergrund
  * Anzeigenillustration
    * Bild | Video
  * Stellenanzeigetitel
  * Klinik/Bereich
  
  * <details>
    <summary>Aufgaben</summary>

    * Titel
    * Beschreibung
    </details>
  
  * <details>
    <summary>Profil</summary>

    * Titel
    * Beschreibung
    </details>
  
  * <details>
    <summary>Angebot</summary>

    * Titel
    * Beschreibung
    </details>
  
  * <details>
    <summary>Bewerbung</summary>

    * Titel
    * Beschreibung
    * Fachkontakt
    * HRkontakt
    </details>
  
  * <details>
    <summary>About</summary>

    * Titel
    * Beschreibung
    </details>
  
  * Benfits
  * SocialFollow
  * Disclaimer
</details>
  
  * <details>
    <summary>Fusszeile</summary>

    * SocialShare
    * Bewerbungslink
    </details>

* Objekte
* Scripts

# Stellenliste
Üblicherweise wird ein Partner die Stellenliste aufgrund seiner eigenen Logik gestalten. Er wird diese aufbauend auf den Details der einzelnen Stellenanzeigen ableiten. Je nach Anwendungsfall kann aber auch ein mehrstufiger Feed gewünscht sein.
Der Feed der Stellenliste kennt drei Ausprägungen:
### Kompletter Feed
Beim kompletten Feed sind alle Angaben der Stelleninserate in der Stellenliste enthalten. In diesem Fall gibt es keinen Feed für einzelne Stellenanzeigen.
Der Vorteil dieser Variante ist der, dass in einem Aufruf alle Anzeigen erhalten werden und damit kein Riskion der Asynchronität der Inhalte der Stellenanzeigen untereinander besteht.
Der Nachteil ist, dass der Transfer lang dauern kann und die übertragene Datei gross werden kann.
### Stellenliste als Übersicht
Der Feed einer Stellenliste als Übersicht erwünscht, so wird diese einige wenige Felder zu Referenzierung der einzelnen Stellenanzeigen beinhalten und jeweils einen Link zur einzelnen Stellenanzeige.
### Keine Stellenliste
Wünscht ein Partner lediglich alle Stellenanzeigen aus einem Verzeichnis abzugreifen, so wird keine Stellenliste erstellt.

## Struktur
* <details>
  <summary>Metadaten</summary>
  
  * Job-ID
  * Letzte Änderung
  * Beschäftigungsgrad min.
  * Beschäftigungsgrad max.
  * Berufsgruppe
</details>

(tbd)

# Feed
Der Feed wird statisch als XML File zur Verfügung gestellt. Es wird immer der komplette Feed geliefert. Das heisst umgekehrt auch, dass kein Diff-File angeboten wird. Stellenanzeigen und Feed sind mit einem Zeitstempel versehen. Ein allfälliger Alt/Neu Vergleich muss das Partnerunternehmen selber bewerkstelligen.
