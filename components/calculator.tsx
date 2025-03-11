"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"

export function Calculator() {
  // 基本输入
  const [salary, setSalary] = useState<number>(0)
  const [workDaysPerWeek, setWorkDaysPerWeek] = useState<number>(5)
  const [annualLeave, setAnnualLeave] = useState<number>(5)
  const [holidays, setHolidays] = useState<number>(11)
  const [workHoursPerDay, setWorkHoursPerDay] = useState<number>(8)
  const [commuteHours, setCommuteHours] = useState<number>(1)
  const [lunchBreakHours, setLunchBreakHours] = useState<number>(1)

  // 环境系数
  const [workEnvironment, setWorkEnvironment] = useState<string>("normal")
  const [genderEnvironment, setGenderEnvironment] = useState<string>("normal")
  const [colleagueEnvironment, setColleagueEnvironment] = useState<string>("normal")
  const [education, setEducation] = useState<string>("bachelor")

  // 计算结果
  const [jobValue, setJobValue] = useState<number>(0)
  const [valueText, setValueText] = useState<string>("")
  const [valueColor, setValueColor] = useState<string>("text-gray-700")

  // 计算工作性价比
  useEffect(() => {
    // 工作环境系数
    const workEnvFactor =
      workEnvironment === "remote" ? 0.8 : workEnvironment === "factory" ? 0.9 : workEnvironment === "cbd" ? 1.1 : 1.0

    // 异性环境系数
    const genderEnvFactor = genderEnvironment === "none" ? 0.9 : genderEnvironment === "many" ? 1.1 : 1.0

    // 同事环境系数
    const colleagueEnvFactor = colleagueEnvironment === "bad" ? 0.95 : colleagueEnvironment === "good" ? 1.05 : 1.0

    // 学历系数
    const educationFactor =
      education === "highschool"
        ? 0.8
        : education === "bachelor"
          ? 1.0
          : education === "master"
            ? 1.6
            : education === "phd"
              ? 2.0
              : 1.2

    // 综合环境系数
    const environmentFactor = workEnvFactor * genderEnvFactor * colleagueEnvFactor

    // 工作时长
    const workingTime = workHoursPerDay + commuteHours - 0.5 * lunchBreakHours

    // 日薪计算 (假设一年工作日 = 52周 * 每周工作天数 - 年假 - 法定节假日)
    const workDaysPerYear = 52 * workDaysPerWeek - annualLeave - holidays
    const dailySalary = salary / workDaysPerYear

    // 工作性价比 = 平均日薪 × 综合环境系数 / (35 × (工作时长 + 通勤时长 - 0.5×摸鱼时长) × 学历系数)
    const value = (dailySalary * environmentFactor) / (35 * workingTime * educationFactor)

    setJobValue(Number.parseFloat(value.toFixed(2)))

    // 设置评价文本和颜色
    if (value < 0.8) {
      setValueText("很惨")
      setValueColor("text-red-500")
    } else if (value < 1.5) {
      setValueText("一般")
      setValueColor("text-yellow-500")
    } else if (value < 2.0) {
      setValueText("不错")
      setValueColor("text-blue-500")
    } else {
      setValueText("很爽")
      setValueColor("text-green-500")
    }
  }, [
    salary,
    workDaysPerWeek,
    annualLeave,
    holidays,
    workHoursPerDay,
    commuteHours,
    lunchBreakHours,
    workEnvironment,
    genderEnvironment,
    colleagueEnvironment,
    education,
  ])

  return (
    <div className="space-y-6">
      {/* 结果显示 */}
      <Card className="p-4 bg-gray-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-medium">工作性价比</h2>
          <div className="flex items-center gap-2">
            <span className={cn("text-2xl font-bold", valueColor)}>{jobValue.toFixed(2)}</span>
            <span className={cn("text-sm", valueColor)}>({valueText})</span>
          </div>
        </div>
      </Card>

      {/* 基本信息 */}
      <Card className="p-6">
        <h2 className="text-lg font-medium mb-4">年薪（元）</h2>
        <div className="flex items-center gap-2 mb-6">
          <Input
            type="number"
            placeholder="税前年薪"
            value={salary || ""}
            onChange={(e) => setSalary(Number(e.target.value))}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <Label htmlFor="workDaysPerWeek">每周工作天数</Label>
            <Input
              id="workDaysPerWeek"
              type="number"
              value={workDaysPerWeek || ""}
              onChange={(e) => setWorkDaysPerWeek(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="annualLeave">年假天数</Label>
            <Input
              id="annualLeave"
              type="number"
              value={annualLeave || ""}
              onChange={(e) => setAnnualLeave(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="holidays">法定节假日</Label>
            <Input
              id="holidays"
              type="number"
              value={holidays || ""}
              onChange={(e) => setHolidays(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="workHoursPerDay">日工作时长/h</Label>
            <Input
              id="workHoursPerDay"
              type="number"
              value={workHoursPerDay || ""}
              onChange={(e) => setWorkHoursPerDay(Number(e.target.value))}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <div>
            <Label htmlFor="commuteHours">通勤时长/h</Label>
            <Input
              id="commuteHours"
              type="number"
              value={commuteHours || ""}
              onChange={(e) => setCommuteHours(Number(e.target.value))}
            />
          </div>
          <div>
            <Label htmlFor="lunchBreakHours">午休时长/h</Label>
            <Input
              id="lunchBreakHours"
              type="number"
              value={lunchBreakHours || ""}
              onChange={(e) => setLunchBreakHours(Number(e.target.value))}
            />
          </div>
        </div>
      </Card>

      <Separator />

      {/* 工作环境 */}
      <div>
        <h2 className="text-lg font-medium mb-4">工作环境</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
          <Button
            variant={workEnvironment === "remote" ? "default" : "outline"}
            onClick={() => setWorkEnvironment("remote")}
            className="justify-start"
          >
            偏僻地区的工厂/工地/户外
          </Button>
          <Button
            variant={workEnvironment === "factory" ? "default" : "outline"}
            onClick={() => setWorkEnvironment("factory")}
            className="justify-start"
          >
            工厂/工地/户外等
          </Button>
          <Button
            variant={workEnvironment === "normal" ? "default" : "outline"}
            onClick={() => setWorkEnvironment("normal")}
            className="justify-start"
          >
            普通环境
          </Button>
          <Button
            variant={workEnvironment === "cbd" ? "default" : "outline"}
            onClick={() => setWorkEnvironment("cbd")}
            className="justify-start"
          >
            CBD/体制内
          </Button>
        </div>
      </div>

      {/* 异性环境 */}
      <div>
        <h2 className="text-lg font-medium mb-4">异性环境</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Button
            variant={genderEnvironment === "none" ? "default" : "outline"}
            onClick={() => setGenderEnvironment("none")}
            className="justify-start"
          >
            没有好看的
          </Button>
          <Button
            variant={genderEnvironment === "normal" ? "default" : "outline"}
            onClick={() => setGenderEnvironment("normal")}
            className="justify-start"
          >
            好看的不多不少
          </Button>
          <Button
            variant={genderEnvironment === "many" ? "default" : "outline"}
            onClick={() => setGenderEnvironment("many")}
            className="justify-start"
          >
            很多好看的
          </Button>
        </div>
      </div>

      {/* 同事环境 */}
      <div>
        <h2 className="text-lg font-medium mb-4">同事环境</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
          <Button
            variant={colleagueEnvironment === "bad" ? "default" : "outline"}
            onClick={() => setColleagueEnvironment("bad")}
            className="justify-start"
          >
            同事脑残同事较多
          </Button>
          <Button
            variant={colleagueEnvironment === "normal" ? "default" : "outline"}
            onClick={() => setColleagueEnvironment("normal")}
            className="justify-start"
          >
            都是普通同事
          </Button>
          <Button
            variant={colleagueEnvironment === "good" ? "default" : "outline"}
            onClick={() => setColleagueEnvironment("good")}
            className="justify-start"
          >
            优秀同事较多
          </Button>
        </div>
      </div>

      {/* 个人学历 */}
      <div>
        <h2 className="text-lg font-medium mb-4">个人学历</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
          <Button
            variant={education === "highschool" ? "default" : "outline"}
            onClick={() => setEducation("highschool")}
            className="justify-start"
          >
            专科及以下
          </Button>
          <Button
            variant={education === "bachelor" ? "default" : "outline"}
            onClick={() => setEducation("bachelor")}
            className="justify-start"
          >
            普通本科
          </Button>
          <Button
            variant={education === "goodbachelor" ? "default" : "outline"}
            onClick={() => setEducation("goodbachelor")}
            className="justify-start"
          >
            211/985本科
          </Button>
          <Button
            variant={education === "master" ? "default" : "outline"}
            onClick={() => setEducation("master")}
            className="justify-start"
          >
            硕士
          </Button>
          <Button
            variant={education === "phd" ? "default" : "outline"}
            onClick={() => setEducation("phd")}
            className="justify-start"
          >
            博士
          </Button>
        </div>
      </div>

      {/* 计算公式说明 */}
      <Card className="p-6 bg-gray-50">
        <h2 className="text-lg font-medium mb-4">计算公式</h2>
        <div className="text-center mb-4">
          <p className="text-lg">
            工作性价比 = 平均日薪 × 综合环境系数 / (35 × (工作时长 + 通勤时长 - 0.5×摸鱼时长) × 学历系数)
          </p>
        </div>

        <div className="space-y-2 text-sm text-gray-600">
          <p>额外建议从点上班的年轻人最终结果乘以 0.95</p>
          <p>工作性价比低 0.8 的人很惨，高于 1.5 的人很爽，高于 2.0 的人爽爆炸</p>
          <p className="font-medium mt-4">注：</p>
          <p>① 平均日薪单位为元（你又不是某类）</p>
          <p>② 综合环境系数 = 1 × 工作环境系数 × 异性环境系数 × 同事环境系数</p>
          <div className="mt-2">
            <p>普通工作环境：工作环境系数为 1.0</p>
            <p>偏僻地区或郊区的工厂、工地、郊苦户外等工作环境：工作环境系数为 0.8</p>
            <p>工厂、工地、郊苦户外等工作环境：工作环境系数为 0.9</p>
            <p>CBD、体制内等工作环境：工作环境系数为 1.1</p>
          </div>
          <div className="mt-2">
            <p>周围好看的异性不多不少：异性环境系数为 1.0</p>
            <p>周围没有好看异性：异性环境系数为 0.9</p>
            <p>周围很多好看异性：异性环境系数为 1.1</p>
          </div>
          <div className="mt-2">
            <p>周围基本上都是普通同事：同事环境系数为 1.0</p>
            <p>周围脑残同事较多：同事环境系数为 0.95</p>
            <p>周围优秀同事较多：同事环境系数为 1.05</p>
          </div>
          <p className="mt-2">③ 工作时长 = 下班时间 - 上班时间</p>
          <p>摸鱼时长 = 不干活时长 + 吃饭时长 + 午休时长</p>
          <div className="mt-2">
            <p>④ 专科及以下学历系数为 0.8，普通本科学历系数为 1，211/985 本科学历系数为 1.2，</p>
            <p>
              普通硕士学历系数为 1.4，211/985 硕士学历系数为 1.6，普通博士学历系数为 1.8，211/985 博士学历系数为 2.0
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

