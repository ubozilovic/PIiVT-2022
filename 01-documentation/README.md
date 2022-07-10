# Aplikacija za pekaru

Ovo je projekat za ispit iz predmeta Praktikum - Internet i veb tehnologije

Broj indeksa: 2021203527
Ime i prezime: Uros Bozilovic
Skolska godina: 2021/2022

## Projektni zahtev

Aplikacija omogućava administratoru sajta pekare da uređuje detalje ponude pekare koje posetioci sajta mogu da pregledaju. Administrator se prijavljuje sa svojim jedinstvenim korisničkim imenom i lozinkom. Kroz deo za upravljanje sadržajem, može da uređuje kategorije proizvoda, npr. lisnata peciva, kolači, pite, torte, pice itd. Pod svaku od kategorija može da dodaje ili da uređuje postojeće proizvode. O svakom proizvodu se vodi evidencija o nazivu, slici, kratkom opisu, jedinici mere, npr. komad, kilogram, pakovanje itd, energetskoj vrednosti po jedinici mere, kao i o spisku sastojaka. Spisak sastojaka je univerzalan i administrator može da ga uređuje. Za svaki sastojak je potrebno da se definiše naziv, ali i to da li je pogodan za vegane, vegetarijance ili ostale. Za svaki proizvod administrator mora da unese cenu po jedinici mere. Posetioci sajta ne moraju da budu prijavljeni da bi pregledali katalog proizvoda u ponudi pekare. Oni mogu da prelistavaju ponudu po kategorijama proizvoda, po sastojku ili po oznaci pogodnosti za vegane ili za vegetarijance. U listi se prikazuju naziv, slika, jedinica mere i cena po jedinici mere, kao i oznaka koja ukazuje da je proizvod pogodan za vegane ili vegetarijance. Proizvod je pogodan za vegane ako u listi sastojaka sadrži samo sastojke koji su pogodni za vegane. Ako sadrži barem jedan sastojak koji je pogodan za vegetarijance, ceo proizvod se označava kao pogodan za vegetarijance, a ako sadrži barem jedan sastojak koji nije pogodan ni za vegane ni za vegetarijance, onda proizvod ne sme da bude označen ni kao pogodan za vegane ni za vegetarijance. Samostalno odrediti grafički simbol za ove indikatore. Kada se otvori stranica sa detaljima proizvoda, prikazati sve postojeće podatke, liste sastojaka, oznake i cenu.

## Tehnicka ogranicenja

- Aplikacija mora da bude realizovana na Node.js platformi korišćenjem Express biblioteke. Aplikacija mora da bude podeljena u dve nezavisne celine: back-end veb servis (API) i front-end (GUI aplikacija). Sav kôd aplikacije treba da bude organizovan u jednom Git spremištu u okviru korisničkog naloga za ovaj projekat, sa podelom kao u primeru zadatka sa vežbi.
- Baza podataka mora da bude relaciona i treba koristiti MySQL ili MariaDB sistem za upravljanje bazama podataka (RDBMS) i u spremištu back-end dela aplikacije mora da bude dostupan SQL dump strukture baze podataka, eventualno sa inicijalnim podacima, potrebnim za demonstraciju rada projekta.
- Back-end i front-end delovi projekta moraju da budi pisani na TypeScript jeziku, prevedeni TypeScript prevodiocem na adekvatan JavaScript. Back-end deo aplikacije, preveden na JavaScript iz izvornog TypeScript koda se pokreće kao Node.js aplikacija, a front-end deo se statički servira sa rute statičkih resursa back-end dela aplikacije i izvršava se na strani klijenta. Za postupak provere identiteta korisnika koji upućuje zahteve back-end delu aplikacije može da se koristi mehanizam sesija ili JWT (JSON Web Tokena), po slobodnom izboru.
- Sav generisani HTML kôd koji proizvodi front-end deo aplikacije mora da bude 100% validan, tj. da prođe proveru W3C Validatorom (dopuštena su upozorenja - Warning, ali ne i greške - Error). Grafički korisnički interfejs se generiše na strani klijenta (client side rendering), korišćenjem React biblioteke, dok podatke doprema asinhrono iz back-end dela aplikacije (iz API-ja). Nije neophodno baviti se izradom posebnog dizajna grafičkog interfejsa aplikacije, već je moguće koristiti CSS biblioteke kao što je Bootstrap CSS biblioteka. Front-end deo aplikacije treba da bude realizovan tako da se prilagođava različitim veličinama ekrana (responsive design).
- Potrebno je obezbediti proveru podataka koji se od korisnika iz front-end dela upućuju back-end delu aplikacije. Moguća su tri sloja zaštite i to: (1) JavaScript validacija vrednosti na front-end-u; (2) Provera korišćenjem adekvatnih testova ili regularnih izraza na strani servera u back-end-u (moguće je i korišćenjem izričitih šema - Schema za validaciju ili drugim pristupima) i (3) provera na nivou baze podataka korišćenjem okidača nad samim tabelama baze podataka.
- Neophodno je napisati prateću projektnu dokumentaciju o izradi aplikacije koja sadrži (1) model baze podataka sa detaljnim opisom svih tabela, njihovih polja i relacija; (2) dijagram baze podataka; (3) dijagram organizacije delova sistema, gde se vidi veza između baze, back-end, front-end i korisnika sa opisom smera kretanja informacija; (4) popis svih aktivnosti koje su podržane kroz aplikaciju za sve uloge korisnika aplikacije prikazane u obliku Use-Case dijagrama; kao i (5) sve ostale elemente dokumentacije predviđene uputstvom za izradu dokumentacije po ISO standardu.
- Izrada oba dela aplikacije (projekata) i promene kodova datoteka tih projekata moraju da bude praćene korišćenjem alata za verziranje koda Git, a kompletan kôd aplikacije bude dostupan na javnom Git spremištu, npr. na besplatnim GitHub ili Bitbucket servisima, jedno spremište za back-end projekat i jedno za front-end projekat. Ne može ceo projekat da bude otpremljen u samo nekoliko masovnih Git commit-a, već mora da bude pokazano da je projekat realizovan u kontinuitetu, da su korišćene grane (branching), da je bilo paralelnog rada u više grana koje su spojene (merging) sa ili bez konflikata (conflict resolution).

## Model Baze
![model baze](/02-resources/modelBaze.png)
**• 	Administrator** <br/>
o	administrator_id	INTEGER	UN	PK,AI<br/>
o	username		VARCHAR	64	UQ<br/>
o	password_hash		VARCHAR	128<br/>
o	created_at		TIMESTAMP		CT<br/>
o	is_active		TINYINT		1	UN,D 1<br/>
**•	Category**<br/>
o	category_id		INTEGER		PK,AI<br/>
o	name			VARCHAR	32	UQ<br/>
**•	Item**<br/>
o	item_id			INTEGER	UN	PK,AI<br/>
o	name			VARCHAR	128	UQ1<br/>
o	description		TEXT<br/>
o	category_id		INTEGER	UN	UQ1,FK<br/>
o	is_active		TINYINT		1	UN,D1<br/>
**•	Photo**<br/>
o	photo_id		INTEGER	UN	PK,AI<br/>
o	name			VARCHAR	255<br/>
o	file_path		TEXT		UQ<br/>
o	item_id			INTEGER	UN	FK<br/>
**•	Ingredient**<br/>
o	ingredient_id		INTEGER	UN	PK,AI<br/>
o	name			VARCHAR	32	UQ<br/>
o	ingredient_type		VARCHAR	32<br/>

**•	Item_ingredient**<br/>
o	item_ingredient_id	INTEGER	UN	PK,AI<br/>
o	item_id			INTEGER	UN	UQ1,FK<br/>
o	ingredient_id		INTEGER	UN	UQ1,FK<br/>
**•	Size**<br/>
o	size_id			INTEGER 	UN	PK,AI<br/>
o	name			VARCHAR	32	UQ<br/>
**•	Item_size**<br/>
o	item_size_id		INTEGER	UN	PK,AI<br/>
o	item_id			INTEGER	UN	UQ1,FK<br/>
o	size_id			INTEGER	UN	UQ1,FK<br/>
o	price			DECIMAL	UN10,2	<br/>
o	kcal			DECIMAL	UN10,2<br/>


## Use-Case dijagram
![use case](/02-resources/UseCasePekara.PNG)
## Uloge korisnika

**Administrator**<br/>
•	Prijava (login) <br/>
•	Uredjivanje kategorija <br/>
•	Uredjivanje proizvoda<br/>
•	Klasifikacija sastojaka ( vegani, vegetarijanci, ostali)<br/>
•	Upravljanje cenama proizvoda<br/>


**Korisnik**<br/>
•	Pregled svih proizvoda<br/>

