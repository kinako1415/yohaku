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
import { useAtom } from "jotai";
import { loginUserAtom } from "@/store/loginUser";
import dayjs from "dayjs";
import { postYohaku } from "@/actions/yohaku/postYohaku";
import { useRouter } from "next/navigation";

export default function InputPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser] = useAtom(loginUserAtom);
  const router = useRouter();
  const selectedDate = dayjs();

  const {
    register,
    handleSubmit,
    control,
    setValue,
    reset,
    formState: { errors },
  } = useForm<postInValue>({
    resolver: zodResolver(postInSchema),
    defaultValues: {
      startedAt: "14:00",
      endedAt: "15:00",
    },
  });

  //時間取得
  const startedAt = useWatch({ control, name: "startedAt" });
  const endedAt = useWatch({ control, name: "endedAt" });

  const onSubmit = async (data: postInValue) => {
    if (!currentUser) {
      return;
    }

    setIsLoading(true);

    console.log("Posted:", data);

    try {
      const startDate = new Date(
        `${selectedDate.format("YYYY-MM-DD")}T${data.startedAt}:00`
      );
      const endDate = new Date(
        `${selectedDate.format("YYYY-MM-DD")}T${data.endedAt}:00`
      );

      const result = await postYohaku(
        currentUser.userId,
        data.title,
        endDate,
        startDate,
        data.place
      );

      if (result.success) {
        console.log("投稿が完了しました！");
        reset({
          title: "",
          place: "",
          startedAt: "14:00",
          endedAt: "15:00",
        });
        router.push("/");
      } else {
        console.log("投稿に失敗しました。");
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
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
                  errors={errors.place?.message}
                  {...register("place")}
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
                  errors={errors.place?.message}
                  {...register("place")}
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
