let top = []
let wr = 0.3548928
let nwr = wr.toFixed(2)
top.push({nick:'pablo',mmr:'10'})
top.push({nick:'juan',mmr:'20'})
top.push({nick:'pedro',mmr:'15'})
top.push({nick:'marc',mmr:'40'})
top.push({nick:'jin',mmr:'80'})
top.push({nick:'jon',mmr:'42'})
top.push({nick:'jun',mmr:'30'})
top.push({nick:'amir',mmr:'28'})
top.push({nick:'suls',mmr:'18'})


top.sort(function(a, b){return b.mmr - a.mmr});
for(var i = 0; i < top.length; i++){
  console.log('Pos ' + (i+1) +' ' + top[i].nick + ' tiene ' + top[i].mmr)
}
var nick = 'jon'

console.log('El nick '+  nick +' tiene la posicion '+(ioa(top, nick) + 1 )+ ' En el ranking')
console.log(nwr)
function ioa(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i].nick === obj) {
            return i;
        }
    }
    return -1;
}
