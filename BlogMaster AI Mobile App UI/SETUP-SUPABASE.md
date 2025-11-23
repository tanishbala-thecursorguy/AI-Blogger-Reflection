# Supabase Setup Instructions

## Schritt 1: SQL Schema in Supabase ausführen

1. **Öffne dein Supabase Dashboard**
   - Gehe zu https://supabase.com/dashboard
   - Wähle dein Projekt aus

2. **Öffne den SQL Editor**
   - Klicke auf "SQL Editor" im linken Menü
   - Klicke auf "New Query"

3. **Führe das Schema aus**
   - Kopiere den **kompletten Inhalt** aus `supabase-schema.sql`
   - Füge ihn in den SQL Editor ein
   - Klicke auf "Run" oder drücke `Cmd/Ctrl + Enter`

4. **Überprüfe die Tabellen**
   - Gehe zu "Table Editor" im linken Menü
   - Du solltest jetzt 3 Tabellen sehen:
     - `profiles`
     - `blogs`
     - `templates`

## Schritt 2: Überprüfe Row Level Security

1. Gehe zu "Authentication" → "Policies"
2. Stelle sicher, dass RLS für alle Tabellen aktiviert ist
3. Die Policies sollten automatisch erstellt worden sein

## Schritt 3: Teste die App

1. Starte den Dev-Server: `npm run dev`
2. Registriere einen neuen Benutzer
3. Fülle das Survey aus
4. Generiere einen Blog und speichere ihn

## Fehlerbehebung

### Fehler: "Could not find the table 'public.profiles'"
- **Lösung**: Das SQL-Schema wurde noch nicht ausgeführt
- Führe `supabase-schema.sql` komplett im SQL Editor aus

### Fehler: "permission denied for table"
- **Lösung**: Überprüfe die RLS Policies
- Stelle sicher, dass die Policies korrekt erstellt wurden

### Fehler beim Sign Up
- **Lösung**: Überprüfe, ob der Trigger `on_auth_user_created` existiert
- Führe den Teil des Schemas für den Trigger erneut aus

## Wichtige Hinweise

- Das Schema muss **einmalig** ausgeführt werden
- Nach dem Ausführen sind alle Tabellen und Policies eingerichtet
- Benutzer können nur ihre eigenen Daten sehen (RLS aktiviert)

