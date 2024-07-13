let login_signup_window = document.querySelector(".login_signup_window");

let user_data_ret = {
	login_flag: false,
	sign_up_flag: false,
	reset_password_flag: false,
	fst_name: "",
	lst_name: "",
	mail: "",
	pswrd: "",
	new_pswrd: "",
};

document.querySelector(".cls_lgn_su_win").addEventListener("click", (_) => {
	user_data_ret.login_flag = false;
	user_data_ret.sign_up_flag = false;
	user_data_ret.reset_password_flag = false;
	login_signup_window.classList.remove("active");
	ActivateLoginSignUpWindow();
	ClearDataInputs();
});

document.querySelector(".login_btn").addEventListener("click", (_) => {
	user_data_ret.login_flag = true;
	user_data_ret.sign_up_flag = false;
	user_data_ret.reset_password_flag = false;

	login_signup_window.classList.add("active");
	ActivateLoginSignUpWindow();
});

document.querySelector(".signup_btn").addEventListener("click", (_) => {
	user_data_ret.login_flag = false;
	user_data_ret.sign_up_flag = true;
	user_data_ret.reset_password_flag = false;

	login_signup_window.classList.add("active");
	ActivateLoginSignUpWindow();
});

login_signup_window
	.querySelector(".login_field h1 a")
	.addEventListener("click", (_) => {
		user_data_ret.sign_up_flag = true;
		user_data_ret.login_flag = false;
		user_data_ret.reset_password_flag = false;

		ActivateLoginSignUpWindow();
	});

login_signup_window
	.querySelector(".login_field .lg_form .user_ip label a")
	.addEventListener("click", (_) => {
		user_data_ret.sign_up_flag = false;
		user_data_ret.login_flag = false;
		user_data_ret.reset_password_flag = true;
		ActivateLoginSignUpWindow();
	});

login_signup_window
	.querySelector(".signup_field h1 a")
	.addEventListener("click", (_) => {
		user_data_ret.sign_up_flag = false;
		user_data_ret.login_flag = true;
		user_data_ret.reset_password_flag = false;

		ActivateLoginSignUpWindow();
	});

// Submit buttons
document.getElementById("submit_login_btn").addEventListener("click", (e) => {
	SetUserDataRetrieved();
	if (user_data_ret.mail != "" && user_data_ret.pswrd.length >= 6) {
		e.preventDefault();
		console.log(user_data_ret);
	}
});

document.getElementById("submit_signup_btn").addEventListener("click", (e) => {
	SetUserDataRetrieved();
	if (
		user_data_ret.fst_name != "" &&
		user_data_ret.lst_name != "" &&
		user_data_ret.mail != "" &&
		user_data_ret.pswrd.length >= 6
	) {
		e.preventDefault();
		console.log(user_data_ret);
	}
});

document
	.getElementById("submit_reset_password_btn")
	.addEventListener("click", (e) => {
		SetUserDataRetrieved();
		if (user_data_ret.mail != "" && user_data_ret.new_pswrd.length >= 6) {
			e.preventDefault();
			console.log(user_data_ret);
		}
	});

function ActivateLoginSignUpWindow() {
	login_signup_window
		.querySelectorAll(".lg-su-field")
		.forEach((form_cont) =>
			form_cont.classList.contains("active")
				? form_cont.classList.remove("active")
				: null
		);

	login_signup_window
		.querySelector(".login_signup_field.lg")
		?.classList.remove("lg");

	login_signup_window
		.querySelector(".login_signup_field.su")
		?.classList.remove("su");

	login_signup_window
		.querySelector(".login_signup_field.rs")
		?.classList.remove("rs");

	if (user_data_ret.login_flag) {
		login_signup_window.querySelector(".login_field").classList.add("active");
		login_signup_window
			.querySelector(".login_signup_field")
			.classList.add("lg");
	} else if (user_data_ret.sign_up_flag) {
		login_signup_window.querySelector(".signup_field").classList.add("active");
		login_signup_window
			.querySelector(".login_signup_field")
			.classList.add("su");
	} else if (user_data_ret.reset_password_flag) {
		login_signup_window
			.querySelector(".reset_password_field")
			.classList.add("active");
		login_signup_window
			.querySelector(".login_signup_field")
			.classList.add("rs");
	}
}

function SetUserDataRetrieved() {
	user_data_ret.fst_name = document.getElementById("su_fst_name").value.trim();
	user_data_ret.lst_name = document.getElementById("su_lst_name").value.trim();

	if (user_data_ret.sign_up_flag) {
		user_data_ret.mail = document.getElementById("su_user_email").value.trim();
		user_data_ret.pswrd = document.getElementById("su_user_password").value;
	} else if (user_data_ret.login_flag) {
		user_data_ret.mail = document.getElementById("user_email").value.trim();
		user_data_ret.pswrd = document.getElementById("user_password").value;
	} else if (user_data_ret.reset_password_flag)
		user_data_ret.mail = document.getElementById("rs_user_email").value.trim();

	user_data_ret.new_pswrd = document.getElementById("new_user_password").value;
}

function ClearDataInputs() {
	document.getElementById("su_fst_name").value = "";
	document.getElementById("su_lst_name").value = "";

	document.getElementById("su_user_email").value = "";
	document.getElementById("su_user_password").value = "";

	document.getElementById("user_email").value = "";
	document.getElementById("user_password").value = "";

	document.getElementById("rs_user_email").value = "";

	document.getElementById("new_user_password").value = "";
}
