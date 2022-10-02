from flask import Flask, render_template
import json
import plotly.graph_objects as go
import plotly
import requests
import time
#from datetime import datetime
import datetime
from flask_cors import CORS
#from plotly.graph_objs import Layout
#from bson.json_util import dumps

app = Flask(__name__,
            static_url_path='',
            static_folder='static',
            template_folder='templates')
app.debug = True

CORS(app)
################################################################################   JSON IN
jm = requests.get('https://jmod-s.herokuapp.com/perfil')
jmodel = jm.json()
jj = json.dumps(jmodel).strip('[]')
arr = json.loads(jj)
################################################################################   CABEcALHO
# get main name
for name in arr:
    n = [*arr]

#print('novonome', name)
# conteudo integral das categorias(cats)
cats = arr[name]

#print('novocats', cats)
# nome das categorias to list  (labels)
for keys in arr[name]:
  labels = [*arr[name].keys()]

#print('newlabels', labels)
# conta as cats
ccats = len(labels)

#print(ccats)
# count all values
ncvalues = []
for x in labels:
    e1 = arr[name][x]['Dados']
    #print(e1)
    e2 = len(e1)
    ncvalues.append(e2)

cvals = sum(ncvalues)
#print('cvals', cvals)
################################################################################   LIMIAR VALUES
lim_v = []
for l in cats:
    l1 = arr[name][l]['Limiar']
    l3 = lim_v.append([l1])

# print('lim_v', lim_v)
################################################################################   X KEYS
nlabels = []
kkk = []
for w in cats:
    c1 = arr[name][w]['Dados']
    c2 = list(c1.keys())
    c3 = kkk.append(c2)
    for x in c2:
        nlabels.append(w)

kkk1 = [val for sublist in kkk for val in sublist]
# print('kkk', kkk1)
# print('nlabels', nlabels)
################################################################################   YZ VALUES
ccc = []
for w in cats:
    c1 = arr[name][w]['Dados']
    c2 = list(c1.values())
    c3 = ccc.append(c2)

ccc1 = [val for sublist in ccc for val in sublist]
# print('ccc1', ccc1)
################################################################################   TEMPLATES
ty3 = [-1.0, 0, 1.0]
tz3 = [-0.5, 1.0, -0.5]

ty4 = []
tz4 = []

ty5 = []
tz5 = []

ty6 = [1.0, 0, -1.0, -1.0, 0, 1.0]
tz6 = [-0.5, -1.0, -0.5, 0.5, 1.0, 0.5]
################################################################################   COORDINATES
gc1 = len(nlabels)
gc2 = len(ccc1)
gc3 = list(range(gc1))
gc4 = list(range(gc2))
gc10 = list(range(ccats))

gc11 = ccc

yyy = []
datas = []
lbls = []
for w in gc10:
    gc12 = gc11[w]
    gc122 = len(gc12)
    gc13 = list(range(gc122))
    gc30 = kkk[w]
    for x in gc13:
        gc5 = labels[w]
        gc6 = gc30[x]
        gc40 = len(gc10)
        stempy = ('ty' + str(gc40))
        gc7 = eval(str(stempy))
        gc8 = (gc7[w] / 1.000) * gc12[x]
        yyy.append(gc8)
        datas.append(gc6)
        lbls.append(gc5)

# print('yyy', yyy)
zzz = []
for w in gc10:
    gc12 = gc11[w]
    gc122 = len(gc12)
    gc13 = list(range(gc122))
    gc30 = kkk[w]
    for x in gc13:
        gc5 = labels[w]
        gc6 = gc30[x]
        gc40 = len(gc10)
        stempz = ('tz' + str(gc40))
        gc7 = eval(str(stempz))
        gc8 = (gc7[w] / 1.000) * gc12[x]
        zzz.append(gc8)

# print('zzz', zzz)
################################################################################   DATE FORMATS
lbls1 = []
for xi in datas:
    date1 = datetime.datetime.strptime(xi, "%d-%m-%Y-%H:%M").strftime("%d-%H:%M")
    date2 = datetime.datetime.strptime(xi, "%d-%m-%Y-%H:%M").strftime("%d-%m-%Y")
    date3 = datetime.datetime.strptime(xi, "%d-%m-%Y-%H:%M").strftime("%m-%Y")
    date4 = datetime.datetime.strptime(xi, "%d-%m-%Y-%H:%M").strftime("%Y")
    date5 = lbls1.append(date1)

# print('xxxf', (lbls1))
################################################################################   LIMIARES
lim = lim_v
lim1 = len(lim)
lim2 = list(range(lim1))

nlim = []

for l in lim2:
    cv1 = gc11[l]
    cv3 = len(cv1)
    lim3 = lim_v[l] * cv3
    nlim.append(lim3)

nlim1 = [val for sublist in nlim for val in sublist]
# print('limiars', nlim)
#####   y, z and labels

ly = []
lz = []
l_lbls = []

for w in gc10:
    gc12 = nlim[w]
    gc122 = len(gc12)
    gc13 = list(range(gc122))
    for x in gc13:
        gc5 = labels[w]
        gc40 = len(gc10)
        stempy = ('ty' + str(gc40))
        stempz = ('tz' + str(gc40))
        gc7 = eval(str(stempy))
        gc77 = eval(str(stempz))
        gc8 = (gc7[w] / 1.000) * gc12[x]
        gc88 = (gc77[w] / 1.000) * gc12[x]
        ly.append(gc8)
        lz.append(gc88)
        l_lbls.append(gc5)

# print('ly', ly)
# print('lz', lz)
# print('l_lbls', l_lbls)
################################################################################   ESCALA DE CORES
def SetColor(co):
    if (co <= 5):
        return "red"
    elif (co >= 5.1 and co <= 8):
        return "darkorange"
    elif (co > 8):
        return "teal"

################################################################################   PLOTAR GRaFICO
f = go.Scatter3d(
    x=lbls1,
    y=yyy,
    z=zzz,
    mode='markers',
    marker=dict(
        size=7,
        opacity=0.9,
        color=list(map(SetColor, ccc1))
    ),
    hovertemplate='<b>%{text}: </b><b>%{hovertext}</b><extra></extra>',
    hovertext=ccc1,
    text=lbls,
    textposition="top center"
)

lim_points = go.Scatter3d(
    x=lbls1,
    y=ly,
    z=lz,
    mode='markers',
    marker=dict(
        size=3,
        opacity=0.4
    ),
    hovertemplate='<b>%{text}: </b><b>%{hovertext}</b><extra></extra>',
    hovertext=nlim1,
    text=l_lbls
)

x = ['10-09:53', '10-09:53', '10-09:53', '10-09:53', '10-09:53', '10-09:53', '10-09:53']
uy1 = [10.1, 0.0, -8.1, -10.1, 0.0, 8.1, 10.1]
uz1 = [-5.05, -7.1, -4.05, 5.05, 9.1, 4.05, -5.05]

tr1 = go.Scatter3d(
    x=x,
    y=uy1,
    z=uz1,
    mode='lines+text',
    line=dict(
        color=list(map(SetColor, ccc1)),
        width=6
    ),
    text=labels,
    textposition="top center",
    hoverinfo='skip'
)

ly = [5.123, 0.0, -5.05, -5.123, 0.0, 5.05, 5.123]
lz = [-2.5615, -5.2, -2.525, 2.5615, 5.2, 2.525, -2.5615]
tr2 = go.Scatter3d(
    x=x,
    y=ly,
    z=lz,
    mode='lines',
    line=dict(
        color='darksalmon',
        width=6
    ),
    hoverinfo='skip'
)



@app.route('/')
def flow():
    
    chart1 = go.Figure(data=[f, lim_points, tr1, tr2],
                       layout=go.Layout(xaxis=dict(range=[0, 5], autorange=False),
                                        yaxis=dict(range=[0, 5], autorange=False),
                                        title="Start Title",
                                        updatemenus=[dict( type="buttons",
                                                           buttons=[dict(label="Play", method="animate", args=[None])])]),
                       frames=[go.Frame(
                           data=[go.Scatter3d(
                               x=lbls1,
                               y=ly,
                               z=lz,
                               mode="markers+lines",
                               line=dict(color="red", width=8))
                           ])]
                       )
    chart1.update_scenes(xaxis_showbackground=False)
    chart1.update_scenes(yaxis_showbackground=False, yaxis_visible=False)
    chart1.update_scenes(zaxis_showbackground=False, zaxis_visible=False)
    camera = dict(
        eye=dict(x=-1.5, y=0.6, z=0.0)
    )
    chart1.update_layout(scene_camera=camera, showlegend=False, width=900, height=600)
    chart2 = go.Figure(data=[f
    , lim_points, tr1, tr2], layout=dict(title='PACIENTE ATUAL'))
    chart2.update_scenes(xaxis_showbackground=False)
    chart2.update_scenes(yaxis_showbackground=False, yaxis_visible=False)
    chart2.update_scenes(zaxis_showbackground=False, zaxis_visible=False)
    camera = dict(
        eye=dict(x=-1.5, y=0.6, z=0.0)
    )
    chart2.update_layout(scene_camera=camera, showlegend=False)
    #chart2.update_scenes(xaxis_type='date')
    chart3 = go.Figure(data=[f, lim_points, tr1, tr2], layout=dict(title='PRÓXIMO PACIENTE'))
    chart3.update_scenes(xaxis_showbackground=False)
    chart3.update_scenes(yaxis_showbackground=False, yaxis_visible=False)
    chart3.update_scenes(zaxis_showbackground=False, zaxis_visible=False)
    camera = dict(
        eye=dict(x=-1.5, y=0.6, z=0.0)
    )
    chart3.update_layout(scene_camera=camera, showlegend=False)
    chart1 = [chart1]
    chart2 = [chart2]
    chart3 = [chart3]
    id1 = ['graph1-{}'.format(i) for i, _ in enumerate(chart1)]
    id2 = ['graph2-{}'.format(i) for i, _ in enumerate(chart2)]
    id3 = ['graph3-{}'.format(i) for i, _ in enumerate(chart3)]
    graphJSON1 = json.dumps(chart1, cls=plotly.utils.PlotlyJSONEncoder)
    graphJSON2 = json.dumps(chart2, cls=plotly.utils.PlotlyJSONEncoder)
    graphJSON3 = json.dumps(chart3, cls=plotly.utils.PlotlyJSONEncoder)
    return render_template('aim360/flow.html', id1=id1, id2=id2, id3=id3, graphJSON1=graphJSON1, graphJSON2=graphJSON2, graphJSON3=graphJSON3)

@app.route('/forms')
def forms():
    return render_template('aim360/forms.html')

@app.route('/ch')
def ch():
    while True:
        chart1 = go.Figure(data=[f, lim_points, tr1, tr2])
        chart1.update_scenes(xaxis_showbackground=False)
        chart1.update_scenes(yaxis_showbackground=False, yaxis_visible=False)
        chart1.update_scenes(zaxis_showbackground=False, zaxis_visible=False)
        camera = dict(
            eye=dict(x=-1.5, y=0.6, z=0.0)
        )
        chart1.update_layout(scene_camera=camera, showlegend=False, width=900, height=600)
        chart1 = [chart1]
        id4 = ['graph1-{}'.format(i) for i, _ in enumerate(chart1)]
        graphJSON4 = json.dumps(chart1, cls=plotly.utils.PlotlyJSONEncoder)
        time.sleep(1)
        return id4, graphJSON4

@app.route('/get_keys', methods=['POST'])
def get_keys():

    return {
        "colection": "data.json",
        "data": ["Mercado", "Material","Ano/Mes","Volume","Faturamento","Unidade"]
    }


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=9999)

#functional hover script d3
#https://codepen.io/plotly/pen/oXadPM?editors=1010

#functional chart animation from frames
#https://codepen.io/plotly/pen/NRNJpv?editors=0010

#functional socketio flask
#https://github.com/miguelgrinberg/Flask-SocketIO