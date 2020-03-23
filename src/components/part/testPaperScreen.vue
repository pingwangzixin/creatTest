<template>
	<div class="">
		<!--头部筛选-->
		<div class="g_test_paper_screen">
		    <div class="screen_box">
		        <p>导入组卷</p>
		        <dl class="clearfix">
		            <dt class="fl"><i class="g_star">*</i>组卷：</dt>
		            <dd class="fl">
		                <input type="text" placeholder="组卷名称">
		            </dd>
		            <dd class="fl">
		                <select name="" id="">
		                    <option value="">选择年级</option>
		                    <option value="">八年级</option>
		                    <option value="">八年级上</option>
		                </select>
		            </dd>
		            <dd class="fl">
		                <select name="" id="">
		                    <option value="">选择学科</option>
		                    <option value="">八年级</option>
		                    <option value="">八年级上</option>
		                </select>
		            </dd>
		            <dd class="fl">
		                <select name="" id="">
		                    <option value="">选择考试</option>
		                    <option value="">八年级</option>
		                    <option value="">八年级上</option>
		                </select>
		            </dd>
		        </dl>
		    </div>
		</div>
		
		<!--视图-->
		<router-view></router-view>
	</div>
	
</template>

<script>
</script>

<style>
</style>