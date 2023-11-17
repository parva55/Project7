import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import StarRating from 'react-native-star-rating';
import { Svg, Path} from 'react-native-svg';
import { getMovieCast, getMovieDetails, getMovieImages, height, imageUrl, width } from '../Api/api';

export default S2 = ({navigation,route}) => {
    const [mInfo , setMInfo] = useState(null);
    const [mImages , setMImages] = useState(null);
    const [mCast , setMCast] = useState(null);
    const [showFullText, setShowFullText] = useState(false);

    const toggleFullText = () => {
        setShowFullText(!showFullText);
    };

    const GetMovieInfo = async id => {
        var res = await getMovieDetails(id);
        // console.log('res',res);
        if(res.resData){
            // console.log('res data in info',res.resData);
            // console.log('res data',`${imageUrl}${res.resData.production_companies[0].logo_path}`);
            setMInfo(res.resData);
        }
    };

    const GetMovieImage = async id => {
        var res = await getMovieImages(id);
        // console.log('res',res);
        if(res.resData?.backdrops){
            // console.log('res data in images',res.resData.backdrops);
            // console.log('res data',`${imageUrl}${res.resData.backdrops[0].file_path}`);
            setMImages(res.resData.backdrops);
        }
    };

    const GetMovieActor = async id => {
        var res = await getMovieCast(id);
        // console.log('res',res);
        if(res.resData?.cast){
            // console.log('res data in cast',res.resData.cast);
            // console.log('res data',`${imageUrl}${res.resData.production_companies[0].profile_path}`);
            setMCast(res.resData.cast);
        }
    };

    useEffect(()=>{
        // console.log('route',route);
        if(route?.params?.id){
            // console.log('route id',route.params.id);
            GetMovieInfo(route.params.id);
            GetMovieImage(route.params.id);
            GetMovieActor(route.params.id);
        }
        // GetMovieInfo(575264);
        // GetMovieImage(575264);
        // GetMovieActor(575264);
    },[route]);

    return (
        <View style={{flex:1,backgroundColor:'#3d3d3d'}}>
            {mInfo != null && (
            <View style={{flex:1}}>
                <View style={{width:'100%',height:'30%',}}>
                    <Image resizeMode='contain' 
                        source={{ uri: (mInfo.belongs_to_collection? `${imageUrl}${mInfo.belongs_to_collection?.backdrop_path}` : `${imageUrl}${mInfo.backdrop_path}`)}} 
                        style={{width:'100%',height:'100%',borderTopRightRadius:20,borderTopLeftRadius:20,}}/>
                    <Svg
                        style={{
                        position: 'absolute',
                        width: '100%',
                        height: '100%',
                        top: height*0.26,
                        left: 0,
                        // backgroundColor:'#3d3d3d'
                        }}
                    >
                        <Path d={`M 0 ${height * 0.05} L 0 0 A ${width* 0.25} ${height * 0.02} 0 0 0 ${width} 0 L ${width} ${height * 0.05} Z`} fill='#3d3d3d'/>
                    </Svg>

                </View>

                <View style={{flexDirection:'row',width:'100%',height:'20%',position:'absolute',top:'25%',margin:'3%'}}>
                    <View style={{width:width * 0.3,}}>
                        <Image resizeMode='contain' 
                            source={{ uri: (mInfo.belongs_to_collection? `${imageUrl}${mInfo.belongs_to_collection?.poster_path}` : `${imageUrl}${mInfo.poster_path}` )}} 
                            style={{
                                width:'100%',
                                height:'100%',
                                borderColor:'#000',
                                borderBottomLeftRadius:20,
                                borderBottomRightRadius:20,
                                shadowColor: 'black',
                                shadowOpacity: 0.5,
                                shadowRadius: 5,
                                shadowOffset: {
                                    width: 4,
                                    height: 4,
                                },
                                }}/>
                    </View>
                    <View style={{alignSelf:'flex-end',marginHorizontal:'2%'}}>
                        <Text style={{color:'#fff',fontSize:18,fontWeight:'700',width:width * 0.7}}>{mInfo.title}</Text>
                        <View style={{flexDirection:'row',marginTop:'1%',justifyContent:'space-between',width:width * 0.5,}}>
                            <View style={{flexDirection:'column'}}>
                                <Text style={{color:'#e60e9e',fontSize:20,fontWeight:'600'}}>{parseFloat(mInfo.vote_average.toFixed(1))}</Text>
                                <Text style={{color:'#8a8496',fontSize:12,fontWeight:'600'}}>Ratings</Text>
                            </View>
                            <View style={{flexDirection:'column',alignSelf:'flex-end',}}>
                                <StarRating
                                    disabled={true}
                                    maxStars={10}
                                    rating={parseInt(mInfo.vote_average)}
                                    starSize={width*0.03}
                                    fullStarColor={'#e60e9e'}
                                    emptyStar={'star'}
                                    emptyStarColor={'#bebfc2'}
                                    halfStarEnabled={true}
                                    starStyle={{marginRight:2}}
                                    // selectedStar={(rating) => setStarCount(rating)}
                                />
                                <Text style={{color:'#8a8496',fontSize:12,fontWeight:'600'}}>Grade now</Text>
                            </View>
                        </View>
                        <Text style={{color:'#dfd2f7',fontSize:14,fontWeight:'500'}}>Popularity:{'     '}{mInfo.popularity}</Text>
                        <Text style={{color:'#dfd2f7',fontSize:14,fontWeight:'500'}}>Revenue:{'     '}${mInfo.revenue}</Text>
                    </View>
                </View>
                <View style={{margin:'3%',position:'relative',top:'15%'}}>
                    <Text style={{color:'#fff',fontSize:20,}}>Story line</Text>
                    <Text style={{color:'#dfd2f7',fontSize:16,width:'100%'}} 
                    ellipsizeMode={showFullText ? 'clip' : 'tail'}
                    numberOfLines={showFullText ? undefined : 2}>{mInfo.overview}</Text>
                    {mInfo.overview.length > 100 && (
                        <TouchableOpacity onPress={()=>toggleFullText()} style={{justifyContent:'flex-end',alignSelf:'flex-end'}}>
                            <Text style={{ color: '#e60e9e', fontSize: 16 }}>
                                {showFullText ? 'less' : 'more'}
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>

                <View style={{margin:'3%',position:'relative',top:'12%',width:'100%',height:height*0.18}}>
                    <Text style={{color:'#fff',fontSize:20,marginBottom:5}}>Photos</Text>
                    <FlatList 
                        data={mImages}
                        horizontal
                        keyExtractor={(item) => item.file_path}
                        renderItem={({item}) => (
                            <View style={{alignItems:'center',width: width*0.45,marginHorizontal:5}}>
                                <Image 
                                    resizeMode='cover'
                                    source={{ uri: `${imageUrl}${item.file_path}`}} 
                                    style={{width:'100%',height:'100%',borderRadius:5}}
                                />
                            </View>
                        )}
                    />
                </View>

                <View style={{margin:'3%',position:'relative',top:'12%',width:'100%',height:height*0.20}}>
                    <Text style={{color:'#fff',fontSize:20,marginBottom:5}}>Actors</Text>
                    <FlatList 
                        data={mCast}
                        horizontal
                        keyExtractor={(item) => item.order}
                        renderItem={({item}) => (
                            <View style={{width: width*0.3,alignItems:'center',justifyContent:'center'}}>
                                <Image
                                    resizeMode='contain'
                                    source={{ uri: `${imageUrl}${item.profile_path}`}}
                                    style={{
                                        width: 100,
                                        height: 100,
                                        borderRadius: 50,
                                    }}
                                />
                                <Text style={{color:'#fff',fontSize:16,textAlign:'center',width:'100%'}} numberOfLines={1}>{item.name}</Text>
                            </View>
                        )}
                    />
                </View>
            </View>
            )}
        </View>
    );
};