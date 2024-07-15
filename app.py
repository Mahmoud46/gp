from flask import Flask, make_response, render_template, jsonify, request,redirect
from storage_control import add_file_to_example_files,get_example_file,save_file,delete_file,excel_to_csv,convert_np_to_native
from control_charts import ControlCharts
from data_comparison import EntitiesComparison
from outpatient_department import OutpatientDepartment
from user_login import login_validate
from user_signup import regestration_validation,user_regestration
from user_data_control import get_user_data_by_username,reset_user_password
import json

app = Flask(__name__)

@app.route('/')
def main():
    return render_template('main.html')

@app.route('/user_login_signup', methods=['GET','POST'])
def user_login_signup():
    if request.method == "POST":
        req = request.get_json()
        user_req_res={}
        
        if req['login_flag']:
            user_req_res=login_validate(req)
            
        elif req['sign_up_flag']:   
            user_req_res=user_regestration(req)
                       
        elif req['reset_password_flag']:
            user_req_res=reset_user_password(req['email'],req['new_pswrd']) 
            
        res = make_response(
            jsonify({'Message': "Transformation has been done successfully","user_req_res":user_req_res}), 200)
        return res

@app.route('/<user_name>')
def user(user_name):
    return render_template('user.html',user_name=user_name)

@app.route('/get_user_data', methods=['GET', 'POST'])
def get_user_data():
    if request.method == "POST":
        req = request.get_json()

        res = make_response(
            jsonify({'Message': "Transformation has been done successfully",'user_data':get_user_data_by_username(req['username'])}), 200)
        return res
    
@app.route('/update_example_files',methods=['GET', 'POST'])
def update_examples():
    if request.method == "POST":
        req = request.get_json()
        
        add_file_to_example_files(req)
        
        res = make_response(
            jsonify({'Message': "Transformation has been done successfully"}), 200)
        return res
    
@app.route('/apply_control_charts',methods=['GET', 'POST'])
def apply_control_charts():
    if request.method == "POST":
        req = request.get_json()
        file_path=''
        if req['from_example']:
            file_info=get_example_file(req["file_num"])
            file_path=save_file(file_info["file_data"],file_info["file_name"],'csv') 
            
        else:
            file_path=save_file(req["file_input_data"],req["file_name"],'csv')
        
        
        res=ControlCharts(file_path).apply_control_char()
        
        delete_file(file_path)
            
        res = make_response(
            jsonify({'Message': "Transformation has been done successfully","result":res}), 200)
        return res
    
@app.route('/apply_hospitals_comparison',methods=['GET', 'POST'])
def apply_hospitals_comparison():
    if request.method == "POST":
        req = request.get_json()
        file_path=''
        if req['from_example']:
            file_info=get_example_file(req["file_num"])
            file_path=save_file(file_info["file_data"],file_info["file_name"],'xlsx') 
            
        else:
            file_path=save_file(req["file_input_data"],req["file_name"],'xlsx')
        
        data_io_paths=excel_to_csv(file_path)
        
        res=EntitiesComparison(data_io_paths[0],data_io_paths[1]).get_result()
        
        print(file_path)
        
        for data_io_path in data_io_paths:
            delete_file(data_io_path)
            
        delete_file(file_path)
        
        res = make_response(
            jsonify({'Message': "Transformation has been done successfully","result":res}), 200)
        return res

@app.route('/apply_outpatient_department',methods=['GET', 'POST'])
def apply_outpatient_department():
    if request.method == "POST":
        req = request.get_json()
        
        file_path=''
        if req['from_example']:
            file_info=get_example_file(req["file_num"])
            file_path=save_file(file_info["file_data"],file_info["file_name"],'csv') 
            
        else:
            file_path=save_file(req["file_input_data"],req["file_name"],'csv')
        
        
        res=OutpatientDepartment(file_path).get_result()
        
        delete_file(file_path)
            
        res = make_response(
            jsonify({'Message': "Transformation has been done successfully","result":convert_np_to_native(res)}), 200)
        return res
    
@app.route('/apply_booking_system',methods=['GET', 'POST'])
def apply_booking_system():
    if request.method == "POST":
        req = request.get_json()
        # print(req)
        file_path=''
        if req['outpatient_dep']['from_example']:
            file_info=get_example_file(req['outpatient_dep']["file_num"])
            file_path=save_file(file_info["file_data"],file_info["file_name"],'csv') 
            
        else:
            file_path=save_file(req['outpatient_dep']["file_input_data"],req['outpatient_dep']["file_name"],'csv')
        
        
        res=OutpatientDepartment(file_path).simulate_appointments_booking(int(req['booking_sys']['mean_patient_num']),float(req['booking_sys']['appointments_time']),float(req['booking_sys']['mean_interarrival_time']))
       
        delete_file(file_path)
            
        res = make_response(
            jsonify({'Message': "Transformation has been done successfully","result":convert_np_to_native(res)}), 200)
        return res