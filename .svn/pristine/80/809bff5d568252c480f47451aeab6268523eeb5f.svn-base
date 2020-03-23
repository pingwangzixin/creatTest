import Vue from 'vue'
import Router from 'vue-router'
//import HelloWorld from '@/components/HelloWorld'
import index from '../components/index.vue'
import testPaperHeader from '../components/part/testPaperScreen.vue'
import process from '../components/part/process.vue'

//组卷
import uploadFile from '../components/testPaper/testAssembly/uploadFile.vue'
import examPaperEdit from '../components/testPaper/testAssembly/examPaperEdit.vue'
import setAnswer from '../components/testPaper/testAssembly/setAnswer.vue'
import testList from '../components/testPaper/testList.vue'



import upload2 from '../components/testPaper/upload2.vue'

//阅卷
import markingNav from '../components/readPaper/markingNav.vue'

import readList from "../components/readPaper/admin/readList.vue"
import platform from "../components/readPaper/admin/platform.vue"
import answerCard from '../components/readPaper/answerCard/answerCard1.vue'
import answerCard11 from '../components/readPaper/answerCard/answerCard11.vue'
import examinationSettings from "../components/readPaper/admin/examinationSettings.vue"
import assignMarkingTasks  from "../components/readPaper/admin/assignMarkingTasks.vue"
import testNumberSetting  from "../components/readPaper/admin/testNumberSetting.vue"
import markingControl from "../components/readPaper/admin/markingControl.vue"
import reviewMonitoring from "../components/readPaper/admin/reviewMonitoring.vue"
import scanAnswerSheet from "../components/readPaper/admin/scanAnswerSheet.vue"


import settingList from "../components/readPaper/setting/settingList.vue"
import testAnalysis from "../components/readPaper/setting/testAnalysis.vue"
import startMarking from "../components/readPaper/setting/startMarking.vue"
import setTestStructure from "../components/readPaper/setting/setTestStructure.vue"





//题库
import questionlist  from "../components/questionBank/questionlist.vue"
import examinationDetails from "../components/questionBank/examinationDetails.vue"





Vue.use(Router)

export default new Router({
//	mode: 'history',

//testPaper 组卷
  routes: [
    { //头部底部
    	name: 'index',
      	path: '/',
     	component: index,
     	redirect: '/index/testPaper/testList',
		children: [
			{//试卷头部进度条
				name: 'process',
				path: '/index/testPaper/process',
				component: process,
				children: [
					{//上传文档
						name: 'uploadFile',
						path: '/index/testPaper/process/uploadFile',
						component: uploadFile,
					},
					{//编辑卷面
						name: 'examPaperEdit',
						path: '/index/testPaper/process/examPaperEdit',
						component: examPaperEdit,
					},{//编辑答案
						name: 'setAnswer',
						path:'/index/testPaper/process/setAnswer',
						component: setAnswer
					}
				]
			},{//试卷列表页
				name: 'testList',
				path: '/index/testPaper/testList',
				component: testList
			},{//阅卷任务
				name: 'markingNav',
				path: '/index/readPaper/markingNav',
				component: markingNav,
				redirect: '/index/readPaper/admin/readList',
				children:[
					{//阅卷管理列表
						name: 'readList',
						path: '/index/readPaper/admin/readList',
						component: readList,
					},
					{//阅卷任务列表
						name: 'settingList',
						path: '/index/readPaper/setting/settingList',
						component: settingList,
					},
					{//扫描答题卡
						name: 'scanAnswerSheet',
						path: '/index/readPaper/admin/scanAnswerSheet',
						component: scanAnswerSheet,
					},
					{//阅卷任务本平台
						name: 'platform',
						path: '/index/readPaper/admin/platform',
						component: platform
					},{//考场设置
						name: 'examinationSettings',
						path: '/index/readPaper/admin/examinationSettings',
						component: examinationSettings
					},{//考场设置
						name: 'assignMarkingTasks',
						path: '/index/readPaper/admin/assignMarkingTasks',
						component: assignMarkingTasks
					},{//开始批阅
						name: 'startMarking',
						path:'/index/readPaper/setting/startMarking',
						component: startMarking
					},{//设置阅卷结构
						name: 'setTestStructure',
						path:'/index/readPaper/admin/setTestStructure',
						component: setTestStructure
					},{//考试好设置
						name: 'testNumberSetting',
						path:'/index/readPaper/admin/testNumberSetting',
						component: testNumberSetting
					},{//阅卷监控
						name: 'markingControl',
						path:'/index/readPaper/admin/markingControl',
						component: markingControl
					},{//阅卷监控查看
						name: 'reviewMonitoring',
						path:'/index/readPaper/admin/reviewMonitoring',
						component: reviewMonitoring
					}
				]
			},{//试卷列表页
				name: 'questionlist',
				path: '/index/questionBank/questionlist',
				component: questionlist
			},{//试卷列表页
				name: 'examinationDetails',
				path: '/index/questionBank/examinationDetails',
				component: examinationDetails
			}
		]
	},
	//预览
	{
		name: 'answerCard11',
		path:'/answerCard11',
		component: answerCard11
	},{//答题卡
		name: 'answerCard',
		path:'/index/readPaper/admin/answerCard',
		component: answerCard
	},{//试题解析
		name: 'testAnalysis',
		path: '/index/readPaper/setting/testAnalysis',
		component: testAnalysis,
	},
	]
});


/*{//试卷头部筛选
	name: 'testPaperScreen',
	path: '/index/testPaperScreen',
	component: testPaperHeader,
	children: [
		{//试卷头部进度条
			name: 'process',
			path: '/index/testPaperScreen/process',
			component: process,
			children: [
				{//编辑卷面
					name: 'examPaperEdit',
					path: '/index/testPaperScreen/process/examPaperEdit',
					component: examPaperEdit,
				},{//编辑答案
					name: 'setAnswer',
					path:'/index/testPaperScreen/process/setAnswer',
					component: setAnswer
				}
			]
		}
	]
}*/