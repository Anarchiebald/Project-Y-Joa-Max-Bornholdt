Project Y - Inhaltserstellung
=======
# Beschreibung
Für die Web-Programmierung und Verteilte Systeme Vorlesung wurde ein Microblogging-Service erstellt. Diese Komponente ist für die Inhaltserstellung zuständig. Umgesetzt wird das Projekt im Frontend mit Angular und im Backend mit Spring Boot.
## Anforderungen
In der Komponente wurden folgende Anforderungen aufgenommen:
- **Erstellung**: Als Benutzer möchte ich Inhalte erstellen, damit ich meine Meinung mit anderen Nutzern teilen kann.
- **Bearbeitung**: Als Benutzer möchte ich meine erstellten Inhalte bearbeiten, damit ich auch meine geänderte Meinung ausdrücken kann.
- **Löschen**: Als Benutzer möchte ich meine erstellten Inhalte löschen, damit ich nicht mit Inhalten in Bezug gebracht werde, die mir nicht mehr gefallen. 
- **Bilder/Videos**: Als Benutzer möchte ich zu Inhalten Bilder und Videos hochladen, damit ich meine Meinung mit anderen Medien unterstützen kann.
- **Ansicht**: Als Benutzer möchte ich Inhalte von anderen Nutzern anschauen, damit ich von anderen Meinungen inspiriert werden kann.

## Hilfsfunktionen
- **Benutzerregistrierung**: Als Benutzer möchte ich einen Account erstellen, damit ich ein personalisiertes Benutzererlebnis habe.
- **Benutzerlogin**: Als Benutzer möchte ich mich An- und Abmelden können, damit ich die Anwendung von mehreren Endgeräten verwenden kann.


## Schnittstellen
Zur Verknüpfung mit den anderen Komponenten sind Schnittstellen notwendig, damit am Ende eine gemeinsame Komponente entsteht. Die Komponenten werden mit REST-APIs miteinander verbunden.
- **Benutzerauthentifizierung**
  Die Authentifizierung ermöglicht eine sichere Benutzerregistrierung inklusive Benutzerlogin. Unter anderem ist eine Anmeldung mit dem Google-Konto oder der Apple-ID möglich. Diese Komponente kann den provisorischen Login dieser Komponente austauschen.
- **Inhaltsinteraktion**
  Die Komponente zur Interaktion mit Inhalten hat sich mit dem Kommentieren, Reposten und Liken beschäftigt. Die Schnittstelle dazu sind in der Ansicht die zufällig generierten Zahlen zu dem Elementen. Verbunden werden diese über eine REST-API.
- **Profilverwaltung**
  Zu der Komponente der Profilverwaltung befindet sich in der Sidebar auf der linken Seite eine direkte Schnittstelle. Unter dem Menüpunkt kann die Seite zur Profilverwaltung hinzugefügt werden. 

## Unterschiede zum ACD
- Doker, Flyway, Kubernetes, Oracle und wie im ACD: Schichtenarchitrktur statt Microservice

## Voraussetzungen für die Installation
- **Java**
- **Node.js**
- **Angular CLI**
- **PostgreSQL**
- **Git**

## Start der Anwendung
1. SQL-Datenbank erstellen
2. Repository clonen und Backend starten
3. Repository clonen und Frontend starten
4. http://localhost:4200 im Browser öffnen
