//Mass paging script for Harbor-UCLA Radiology
var iagn = 1;
var database = '\
2557,DAVALOS, ERIC,1;\
2512,HAYASHI, HISAMI,1;\
3795,NASHED, MARK,1;\
0368,PARIS, ELIAS,1;\
0660,REDDY, SAPNA,1;\
5545,YU, SAMUEL,1;\
5686,GANDHI, NISHANT,2;\
2307,HA, TONY,2;\
3645,KHONG, CHRISTINE,2;\
1166,KIANMAHD, BENJAMIN,2;\
1694,KIM, JAMES,2;\
5890,MAGOON, PATRICK,2;\
6008,DINES, MARSHALL,3;\
5430,GUPTA, RAVI,3;\
4225,LAU, ERIC,3;\
1323,NADAV, BRIAN,3;\
1766,SANCHEZ, PATRICK,3;\
0817,TRUONG, LOUISE,3;\
1971,CHEN, JOHNATHAN,4;\
5306,CHO, JOHN,4;\
1848,DALAL, ROOSHIN,4;\
0488,KIM, SARAH,4;\
2119,NGAI, STEVEN,4;\
2013622,CHIONG, BRIAN,f;\
1435,CHOI, PATRICK,f;\
0384,GWAK, TOBY,f;\
2536,NANKIN, NILS,f;\
2370,BARANK, DAVID,F;\
2573,DIAMENT, MICHAEL,F;\
4053,ECKEL, GREGORY,F;\
6687,FISCHER, HANS,F;\
6471,GARJIAN, KAREEN,F;\
0594,KALANTARI, BABAK,F;\
0605,KHALKHALI, IRAJ,F;\
2509,MEHRINGER, MARK,F;\
5676,MLIKOTIC, ANTON,F;\
2596,PHILLIPS, JEFFREY,F;\
3998,RENSLO, RICHARD,F;\
2526,SHEIKH, ALYA,F;\
1369,SHIM, JOHN,F;\
0607,SOMMERSTEIN, ADAM,F;\
2469,TANOURA, TAD,F;\
2116,VARMA, RAJEEV,F;\
2580,WALOT, IRWIN,F';

var records = database.split(';');
for (var i = 0; i < records.length; i++)
{
  var fields = records[i].split(',');

  var fullnumber = fields[0];
  if (fullnumber.length == 4)
    fullnumber = '310501' + fullnumber;
  else if (fullnumber.length == 7)
    fullnumber = '310' + fullnumber;
  else if (fullnumber.length == 10) ;
  else fullnumber = 'ERROR';

  if (i % 15 == 0)
    document.write('</td><td>');
  document.write ('<input type="checkbox" id='+fields[3]+fullnumber+' onclick=ProcessForm()>'+fields[3]+': '+fields[1]+' ('+fullnumber+')<br>\n');
}

function BatchPage(message, numbers)
{
  if (numbersbox.value == "")
  {
    alert("No recipients.");
    return;
  }

  numberz = numbers.split(',');
  for (var i = 0; i < numberz.length; i++)
    SendPage(numberz[i], message);
}

function SendPage(number, message)
{
  var myWindow = window.open("batchpage.htm","_blank","width=200,height=100");
  myWindow.document.write('\
	<form method=post id=send action="http://www.Arch.com/cgi-bin/wwwpage.exe">\
	<input name=PIN value="'+number+'">\
	<input name=MSSG value="'+message+'">\
	<input name=Q1 value=0>\
	<input type=submit>\
	</form>\
	<scr'+'ipt>document.forms["send"].submit()</scr'+'ipt>');
  /*myWindow.document.write('\
	<form method=post id=send action="http://www.Arch.com/cgi-bin/wwwpage.exe">\
	<input name=PIN value="'+number+'">\
	<input name=MSSG value="'+message+'">\
	<input name=Q1 value=0>\
	<input type=submit>\
	</form>');*/
}

function TestPop()
{
  var myWindow = window.open("batchpage.htm","_blank","width=200,height=150");
  myWindow.document.write('\
	Popups ok!\
	<scr'+'ipt>alert("Scripts ok!")</scr'+'ipt>');
}

function CheckLength()
{
  currentLength.value = messagebox.value.length;
}

function ProcessForm()
{
  var cb = document.getElementsByTagName('input');
  numbersbox.value = "";
   
  for (var i=0; i<cb.length; i++)
  {
    if (cb[i].getAttribute('type') == "checkbox")
      if (cb[i].checked==true)
      {
        if (numbersbox.value == '') numbersbox.value = cb[i].id.substring(1);
        else numbersbox.value = numbersbox.value + ',' + cb[i].id.substring(1);
      }
  }
}

function MassClick(letter)
{
  var cb = document.getElementsByTagName('input');
  numbersbox.value = "";
   
  for (var i=0; i<cb.length; i++)
  {
    if (cb[i].getAttribute('type') == "checkbox")
      if (cb[i].id.substring(0,1)==letter)
        cb[i].checked = true;
  }
  ProcessForm();
}