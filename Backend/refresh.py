
@app.route('/refresh_data')
def refresh_data():
    time = requests.args.get('time', type=int)
    if not time:
        return jsonify({status: 'error: incorrect parameters'})
    data = requests.get('https://jmod-s.herokuapp.com/jmod' % time)
    # process the results...
    return jsonify({status: 'success', data: data})