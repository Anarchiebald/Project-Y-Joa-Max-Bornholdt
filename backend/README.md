Project Y - Inhaltserstellung (Joa Max Bornholdt)
=======
# Beschreibung
Für die Web-Programmierung und Verteilte Systeme Vorlesung wurde ein **Microblogging-Service** erstellt, angelehnt an Twitter/X. Diese Komponente ist für die **Inhaltserstellung** zuständig. Das Projekt wurde im Frontend mit **Angular** und im Backend mit **Spring Boot** umgesetzt.
## Anforderungen
Die Komponente erfüllt folgende Anforderungen:
- **Erstellung**: Als Benutzer möchte ich Inhalte erstellen, um meine Meinung mit anderen Nutzern zu teilen.
- **Bearbeitung**: Als Benutzer möchte ich meine erstellten Inhalte bearbeiten, um auch geänderte Meinungen ausdrücken zu können.
- **Löschen**: Als Benutzer möchte ich meine erstellten Inhalte löschen, um nicht mit Inhalten in Verbindung gebracht zu werden, die mir nicht mehr gefallen. 
- **Bilder/Videos**: Als Benutzer möchte ich zu Inhalten Bilder und Videos hochladen, um meine Meinung mit anderen Medien zu unterstützen.
- **Ansicht**: Als Benutzer möchte ich Inhalte von anderen Nutzern anschauen, um von deren Meinung inspiriert zu werden.

## Hilfsfunktionen
Es wurden weitere Funktionen hinzugefügt, um die einen sinnvollen Prototypen zu erstellen und diesen bestmöglich zu testen. Auf diese Funktionen wurde bei der Entwicklung kein Fokus gelegt, sie dienen lediglich der Funktionalität.
- **Benutzerregistrierung**: Als Benutzer möchte ich einen Account erstellen, um ein personalisiertes Benutzererlebnis zu haben.
- **Benutzerlogin**: Als Benutzer möchte ich mich an- und abmelden können, um die Anwendung von mehreren Endgeräten aus nutzen zu können.

## Schnittstellen
Die Komponente wird über **REST-APIs** mit den anderen Komponenten verbunden, dafür sind folgende Schnittstellen vorgesehen:
- **Benutzerauthentifizierung**:
  Die Authentifizierung ermöglicht eine sichere Benutzerregistrierung inklusive Benutzerlogin. Zusätzlich ist eine Anmeldung mit dem Google-Konto oder der Apple-ID möglich. Die Benutzerauthentifizierung kann den provisorischen Login ersetzen.
- **Inhaltsinteraktion**:
  Die Komponente zur Interaktion mit Inhalten ermöglicht das Kommentieren, Reposten und Liken von Inhalten. Die Schnittstellen dazu sind die zufällig generierten Zahlen zu den genannten Elementen in der Inhaltsansicht. Die Verbindung erfolgt über eine REST-API.
- **Profilverwaltung**:
  Mit der Profilverwaltung lassen sich die Benutzerdaten ändern und ein Profilbild erstellen. Eine Schnittstelle befindet sich in der Sidebar auf der linken Seite unter dem Menüpunkt "Profile", hier kann eine Seite zur Profilverwaltung hinzugefügt werden.

## Unterschiede zum ACD
Diese Komponente ist nur ein **Minimum Viable Product (MVP)** der gesamten Anwendung. Aufgrund des deutlich reduzierten Umfangs wurde teilweise vom **Architecture-Concept-Document (ACD)** abgewichen, um die Komplexität zu begrenzen und den Fokus auf die wesentlichen Funktionen zu legen.
- **Hosting**: Der Prototyp dient dem Testen der Funktionen, daher entfällt das Hosting und die Verwendung von Docker und Kubernetes.
- **Datenbank**: Das ACD sieht eine Trennung von User-Datenbank und Business-Datenbank vor. Für die Funktionen der Inhaltserstellung spielt dies keine Rolle, sodass auf die Trennung der Datenbanken verzichtet wurde. Weiter wurde sich aus Kostengründen und zur Vereinfachung gegen die Oracle-Datenbank und für PostgreSQL entschieden. Damit entfällt auch die Verwendung von Flyway für die Datenbankmigraion.
- **Architektur**: Da es sich nur um ein MVP handelt, ist diese Komponente als Schichtenarchitektur entwickelt und nicht als Microserervice.

## Voraussetzungen für die Installation
- **Java 21**
- **Node.js + npm**
- **Angular CLI**
- **PostgreSQL**
- **Git**

## Start der Anwendung
1. **Datenbank:**
   - Erstelle eine PostgreSQL-Datenbank, z.B. mit pgAdmin:
  ```sql
    CREATE DATABASE *Datenbankname*;
    CREATE USER *Username* WITH ENCRYPTED PASSWORD *Backend-Umgebungsvariable*;
    GRANT ALL PRIVILEGES ON DATABASE *Datenbankname* TO *Username*;
  ```
2. **Backend:**
   - Clone das Repository
   - Setze die Umgebungsvariable "DB_PASSWORD" für "application.properties"
   - Starte das Backend
3. **Frontend:**
   - Clone das Repository
   - Starte das Frontend
4. **Anwendung öffnen:**
   - Öffne im Browser die URL: http://localhost:4200
