# 云阅卷功能设计
## 1.评卷管理
* **评卷工作**

	> **新增**
	
        整个谲卷工作开展前需要先创建

	> **开始评卷**

		所有考生的答卷数据上传后，进入评卷环节，此时系统根据试卷数据统计生成评卷科目
* 评卷员
	* 创建
	* 分配任务
		将一个或多个科目分配给评卷员
	* 删除任务
		1. 如果该任务没有开始，则删除任务记录
		2. 如果该任务有评卷记录，则保留任务，并将该任务应评总数置为已评数，标记完成
		3. 不能删除已完成的任务
	* 评分
		1. 评卷员给出各主观题分数提交后，系统自动对客观题评分，然后给出总分
		2. 评卷结束前，可以修改已经评的分数
	* 提交异常卷
		发现试卷异常，打分后，可以标记异常提交。异常卷分为雷同卷和科目错误卷
* 进度查看
	* 科目总览
		查看各科目进度
	* 评卷员进度
		查看各评卷员评卷总进度及各任务进度
* 试卷查看
	* 评分详情
		可打回重评
	* 查看原卷

		查看考生答卷的图片
## 2.质量监控
* 评卷速度
    * 最低评卷速度
    * 最高评卷速度
* 评分区间
* 阅卷排名
