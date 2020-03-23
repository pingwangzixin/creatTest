import Axios from 'axios';
const $http = Axios;

/*let axios = Axios.create({
    baseURL: 'http://127.0.0.1:8761/',
    headers: {'X-Requested-With': 'XMLHttpRequest'},
    transformRequest: [function (data) {
        //在data当中存在数组的话需要加上{arrayFormat: 'brackets'} 否则提交时数组会显示下标
        data = Qs.stringify(data,{arrayFormat: 'brackets'});
        return data;
    }],
    withCredentials: true

});
*/

//ip

export const configure = {
	testPaper : 'http://198.9.6.137:8080/',
	itemBank:"http://61.131.228.98:9009/"
//	testPaper : 'http://47.105.212.238:8095/',
//	itemBank:"http://47.105.212.238:8095/",
//	testPaper : 'http://198.9.6.35:8080/',		//刘帅本地
};



	
export let wordRelevant = {
	//上传word获取数据
	wordData : (data) => {
		return $http({
			method : 'post',
			url : configure.testPaper + 'examPaper/paper/upload',
			data : data,
			headers:{'Content-Type':'multipart/form-data'}
		})
	},
	//粘贴获取数据
	pasteData : (data) => {
		return $http({
			method : 'post',
			url : configure.testPaper + 'examPaper/paper/uploadJson',
			data : data,
			headers:{'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'}
//			headers:{"content-type":"application/json"}
//			headers:{'Content-Type':'multipart/form-data'}
//			headers:{"content-type":"application/x-www-form-urlencoded"}
		})
	},
	//编辑卷面/答案提交
	submitAllData : (data) => {
		return $http({
			method : 'post',
			url : configure.testPaper + 'examPaper/paper/save',
			data : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	//编辑卷面/答案回显
	echoAllData : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'examPaper/paper/findDocAnalaysisJson',
			params : data,
//			data : data,
			headers:{"content-type":"application/json"}
		})
	},
	//获取知识点
	//http://198.9.6.137:8080/examPaper/problemSpecial/getNodeTree?levelId=level_2&subjectId=subject_2_2
	getKnowledData : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'examPaper/problemSpecial/getNodeTree',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},
	//考试列表获取年级
	//	http://198.9.6.137:8080/examPaper/jeuc/api/ea/eaOffice?levelId=level_2
	getGradeData : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'examPaper/jeuc/api/ea/eaOffice',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},
	//考试列表获取学科
	//http://198.9.6.137:8080/examPaper/jeuc/api/edu/eduSubject?levelId=level_2
	getSubjectData : (data) => {
		return $http({
			method : 'get',
			// url : configure.testPaper + 'examPaper/jeuc/api/edu/eduSubject',
			url : configure.testPaper + 'examPaper/jeuc/api/edu/eduSubject',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},
	//考试列表获取考试类型
	//http://198.9.6.137:8080/examPaper/paperType/listData
	getExamTypeData : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'examPaper/paperType/listData',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},
	//考试列表获取试卷列表
	//http://198.9.6.137:8080/examPaper/paper/findPage?pageNo=3&subjectId=subject_2_2&gradeId=term_7_1&type=6
	getTestListData : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'examPaper/paper/findPage',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},
	//考试列表创建考试
	//http://198.9.6.137:8080/examPaper/paper/savePaper?levelId=level_2&paperName=%E8%80%83%E8%AF%95%E6%B5%8B%E8%AF%95&subjectId=subject_2_2&type=6&gradeId=term_7_1
	addTestListData : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'examPaper/paper/savePaper',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},
	//考试列表修改考试
	//http://198.9.6.137:8080/examPaper/paper/updatePaper?id=5fe7b072554b4faabc05df2e2fb8199e&levelId=level_2&paperName=%E8%80%83%E8%AF%95%E6%B5%8B%E8%AF%951&subjectId=subject_2_2&type=6&gradeId=term_7_1
	updateTestListData : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'examPaper/paper/updatePaper',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},
	
	
	
	
	//考试列表根据ID获取试卷信息
	//http://198.9.6.137:8080/examPaper/paper/form?id=5fe7b072554b4faabc05df2e2fb8199e
	
	//考试列删除试卷
	//http://198.9.6.137:8080/examPaper/paper/deletePaper?id=5fe7b072554b4faabc05df2e2fb8199e
	delTestListData : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'examPaper/paper/deletePaper',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},
	// 试卷列表 重置  http://198.9.6.137:8080/examPaper/paper/resetPaper?id=5fe7b072554b4faabc05df2e2fb8199e
	resetTestListData : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'examPaper/paper/resetPaper',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},
	//卷库学科列表 http://198.9.6.137:8080/examPaper/jeuc/api/edu/eduLevelSubject?levelId=level_2
	subjectListData : (data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'examPaper/jeuc/api/edu/eduLevelSubject',
			params : data,
			headers:{"content-type":"application/json"}
		});
	},
	// 卷卡合一测试
	integration:()=>{
		return $http({
			method : 'get',
			url : configure.testPaper + 'examPaper/paper/paperSectionConfiguration',
			// params : data,
			// headers:{"content-type":"application/json"}
		});
	},
	// 答题卡保存
	preservation:(data) => {
		return $http({
			method : 'post',
			url : configure.testPaper+'examPaper/answerSheet/saveConfiguration',
			data : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 获取阅卷列表
	getMarkingList:(data) => {
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/findPage',
			params : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	//阅卷步骤状态查询
	//http://localhost:8080/examPaper/markingTask/form?id=ce95bfb9b487430b916c73ef14529f84
	queryState:(data) => {
		return $http({
			method : 'get',
			url : configure.testPaper + 'examPaper/markingTask/form',
			params : data,
//			data : data,
			headers:{'Content-Type':'application/x-www-form-urlencoded'}
		})
	},
	// 创建阅卷任务
	createMarkingTask:(data) => {
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/saveMarkingTask',
			params : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 阅卷列表删除
	deleteMarkingTask:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/delete',
			params : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 查询答题卡
	inquiryAnswerCard:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/answerSheet/form',
			params : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 定稿
	queryTestPaper:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/finalizeSaved',
			params : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 设置卷面结构保存
	setStructureSave:(data)=>{
		return $http({
			method : 'post',
			url : configure.testPaper+'examPaper/answerSheet/saveOuterAnswerSheet',
			data : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 获取标记阅卷任务的主观题
	markingTaskSubjective :(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/findSubGroupQuzsTask',
			params : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 查询老师信息
	teacherInformation :(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/findTeaListBySidAndOid',
			params : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 客观题查询
	objectiveQuestionsAnswer :(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/findobjQuzAnswerSectionLists',
			params : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	}, 
	// 分配阅卷任务保存
	assignMarkingTaskSave:(data)=>{
		return $http({
			method : 'post',
			url : configure.testPaper+'examPaper/markingTask/oprateMarkingTaskBySubQuz',
			data : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 学生
	queryStudents :(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/findStudentListByClassId',
			params : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 获取班级列表
	getClassList:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/findClassInfoByOfficeIdAndGradeIdDict',
			params : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 考试号设置保存
	saveExamNumberSettings:(data)=>{
		return $http({
			method : 'post',
			url : configure.testPaper+'examPaper/markingTask/saveMarkingTaskStudentList',
			data : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 客观题设置保存
	saveObjectiveQuestions:(data)=>{
		return $http({
			method : 'post',
			url : configure.testPaper+'examPaper/markingTask/saveObjQuzAnswerSectionListsConfig',
			data : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 考试号设置查询
	examinationNumberSettingQuery:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/findMarkingTaskStudentList',
			params : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 教材知识点试卷
	questionBankNavQuery:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/problemType/findAll',
			params : data,
//			data : JSON.stringify(data,{arrayFormat: 'brackets'}),
			headers:{"content-type":"application/json"}
		})
	},
	// 查询版本号
	queryVersionNo:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/problemTextbook/findVersion',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 查询教材大纲
	queryTextbookOutline:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/problemTextbook/getNodeTree',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 查询题库题型
	queryQuestionType:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/problemQuestionTypeSubject/findQuestionType',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 查询题库难度
	queryDifficulty:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/problemQuestionDifferent/findQuestionDifferent',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 查询题库知识点
	queryKnowledgePointOutline:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/problemSpecial/getNodeTree',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 查询题库试题类型
	queryTestQuestionsType:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/problemPaperTypeSubject/findAll',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 查询题库试题时间
	queryTestPaperYear:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/problemPaperYear/findAll',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 查询题库试题省份
	queryTestPaperProvince:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/problemPaperProvince/findAll',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 查询试题列表
	queryTestPaperList:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/problemPaper/findPage',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 考场设置保存
	saveRoomSetting:(data)=>{
		return $http({
			method : 'post',
			url : configure.testPaper+'examPaper/paperMarkingTaskRoomSetting/saveRoomSetting',
			data : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 按班级或者考场展示学生
	queryStudentList:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/paperMarkingTaskClassStudent/findPage',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 查询考场
	enquiryExaminationHall:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/paperMarkingTaskRoomSetting/findPaperMarkingTaskRoomSettingByTaskId',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 教材查询
	queryTextbook:(data)=>{
		return $http({
			method : 'get',
			//mysql查询  examPaper/problemTextbook/textBookQuestion
			//  ES 查询  examPaper/textBookQuestion/page
//			url : configure.testPaper+'examPaper/problemTextbook/textBookQuestion',
			url : configure.itemBank+'examPaper/textBookQuestion/page',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 知识点查询
	knowledgePointsTextbook:(data)=>{
		return $http({
			method : 'get',
			//mysql查询  examPaper/problemSpecial/specialQuestion
			//  ES 查询  examPaper/specialQuestion/page
//			url : configure.testPaper+'examPaper/problemSpecial/specialQuestion',
			url : configure.itemBank+'examPaper/specialQuestion/page',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 试卷详情查询
	queryTestPaperDetails:(data)=>{
		return $http({
			method : 'get',
			//mysql查询  examPaper/problemPaper/paperDetails
			//  ES 查询  examPaper/paperQuestion/paperDetails
//			url : configure.testPaper+'examPaper/problemPaper/paperDetails',
			url : configure.itemBank+'examPaper/paperQuestion/paperDetails',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 开始阅卷
	startmarking:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/beginMarkingTask',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 习题栏查询
	exerciseBarView:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/problemUserQustion/userQuestion',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 添加删除习题栏题目
	addDeleteExerciseBar:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/problemUserQustion/save',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 阅卷任务列表查询
	queryMarkingTaskList:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/findTeacherMarkingTaskList',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 阅卷任务详情查询
	queryMarkingTaskDetailed:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/markingTask/findTeacherMemberAnswerSheetTaskSubQuzList',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 教师阅卷题提交
	teacherExaminationQuestions:(data)=>{
		return $http({
			method : 'post',
			url : configure.testPaper+'examPaper/memberSubQuz/markingScoreAndImageBase64ByQuzIds',
			data : data,
			headers:{'Content-Type':'multipart/form-data'}
		})
	},
	// 合并成绩
	mergerResults:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/memberSheetTask/mergeMemberScore',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 扫描答题卡查询
	scanAnswersheet:(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/memberSheetTask/findMemberUploadingDatas',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 总体批阅进度查询
	queryOverallReviewProgress :(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/memberSheetTask/findOverallReviewStatisticsDatas',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 教师给分统计查询
	teachersScoresStatistics :(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/memberSheetTask/findTeacherReviewStatisticsDatas',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 扫描答题卡完成
	scanAnswerSheetCompleted :(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/memberSheetTask/finishedUploadMemberAnswerSheet',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 阅卷完成
	markingCompletion :(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/memberSheetTask/finishedMemberTeachingBy',
			params : data,
			headers:{"content-type":"application/json"}
		})
	},
	// 清空学员上传答题卡
	clearStudentUploadAnswerCard :(data)=>{
		return $http({
			method : 'get',
			url : configure.testPaper+'examPaper/memberSheetTask/clearBlankMemberAnswerSheet',
			params : data,
			headers:{"content-type":"application/json"}
		})
	}
}	
