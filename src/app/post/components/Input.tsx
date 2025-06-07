"use client";

import { useForm, useWatch } from "react-hook-form";
import style from "./Input.module.scss";
import { InputField } from "@/components/elements/Input";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import { Button } from "@/components/elements/Button";
import { TimeSelect } from "./TimeSelect";
import { InputArea } from "@/components/elements/InputArea";
import { zodResolver } from "@hookform/resolvers/zod";
import { postInSchema, postInValue } from "@/schemas/post";
import { useState } from "react";

export default function InputPage() {
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<postInValue>({
    resolver: zodResolver(postInSchema),
    defaultValues: {
      startedAt: "14:00",
      endedAt: "15:00",
    },
  });

  const startedAt = useWatch({ control, name: "startedAt" });
  const endedAt = useWatch({ control, name: "endedAt" });

  const onSubmit = async (data: postInValue) => {
    setIsLoading(true);
    console.log("Posted:", data);
    // 実際の投稿処理（API呼び出しなど）
    await new Promise((resolve) => setTimeout(resolve, 2000)); // 2秒間のシミュレーション
    setIsLoading(false);
    alert("投稿が完了しました！"); // 完了メッセージ
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={style.container}>
        <Tabs className={style.tabs}>
          <TabList className={style.tabList}>
            <Tab className={style.tab} selectedClassName={style.tabSelected}>
              今から
            </Tab>
            <Tab className={style.tab} selectedClassName={style.tabSelected}>
              後日指定
            </Tab>
          </TabList>
          {/* 今からの時 */}
          <TabPanel>
            <div className={style.wrapper}>
              <div className={style.contentTitle}>
                <InputArea
                  label="タイトル"
                  placeholder="例：天気がいいのでお散歩しませんか？"
                  fixedHeight="20px"
                  errors={errors.title?.message}
                  {...register("title")}
                />
              </div>
              <div className={style.contentArea}>
                <InputField
                  label="場所"
                  type="Area"
                  placeholder="例：〇〇公園"
                  errors={errors.area?.message}
                  {...register("area")}
                />
              </div>
            </div>
          </TabPanel>

          {/* 後日指定の時 */}
          <TabPanel>
            <div className={style.wrapper}>
              <div className={style.contentTitle}>
                <InputArea
                  label="タイトル"
                  placeholder="例：天気がいいのでお散歩しませんか？"
                  fixedHeight="20px"
                  errors={errors.title?.message}
                  {...register("title")}
                />
              </div>
              <div className={style.contentArea}>
                <InputField
                  label="場所"
                  type="Area"
                  placeholder="例：〇〇公園"
                  errors={errors.area?.message}
                  {...register("area")}
                />
              </div>
            </div>
          </TabPanel>
        </Tabs>
        <TimeSelect
          startedAt={startedAt}
          endedAt={endedAt}
          onStartChange={(val) => setValue("startedAt", val)}
          onEndChange={(val) => setValue("endedAt", val)}
        />
        <div className={style.submitButton}>
          <Button type="submit" isLoading={isLoading}>
            余白をシェアする
          </Button>
        </div>
      </div>
    </form>
  );
}
